import groovy.json.JsonSlurper

pipeline {
  agent any
  environment {
      //需要修改：注意是http地址，端口号是8888
      gitUrl = 'http://10.0.50.18:8888/zhangshenshen/website-navigation-system-vue.git'
      //需要修改：通过jenkins流水线语法生成
      credentialsId = '5e164370-6e66-4e20-9fd7-97702f9ec2d4'
      language = 'vue'
      gitCommitId = ''
      BUILD_USER_ID = ''
      BUILD_USER = ''
      BUILD_USER_EMAIL = ''
  }

  stages {
    stage('代码拉取') {
      steps {
        checkout(
        [
          $class: 'GitSCM', branches: [[name: '*/${branche}']],
          extensions: [],
          userRemoteConfigs:
            [[
              credentialsId:"${env.credentialsId}",
              url: "${env.gitUrl}"
            ]]
        ])

        script {
          gitCommitId = sh(returnStdout: true, script: 'git rev-parse  HEAD').trim()
        }
      }
    }

    stage ('并行') {
      parallel {
        stage('镜像制作') {
          steps {
            sh '''
          cnpm install
          cnpm run build
          docker build   -f Dockerfile.${cpu} -t ${imageName}:${imageVersion}-${type}-${cpu} .
          '''
          }
        }

        stage('sonar扫描') {
          steps {
            sh '''
            echo "【sonar扫描】"
            uuid=$(uuidgen)
            ${SONARRUNNER_HOME}/bin/sonar-scanner  -Dsonar.projectKey=${uuid} -Dsonar.projectName=${uuid} -Dsonar.sources=./src -Dsonar.exclusions=./node_modules/ -Dsonar.login=sqa_1447d3beb0303b3f07bb4ca203c6fd90e6e6910f  -Dsonar.host.url=http://10.0.50.24:19000
            sleep 3
            docker exec -i sonar_Py_env /bin/bash -c "/usr/local/bin/python /mnt/sonar.py ${uuid}" > resaults.log
            '''
            echo '------------------------------------------------------------'
            script {
              env.sonar_project_smell = sh(returnStdout: true, script: "cat resaults.log |grep 异味 |awk '{print \$3}'").trim()
              env.sonar_project_vuln = sh(returnStdout: true, script: "cat resaults.log |grep 漏洞 |awk '{print \$3}'").trim()
              env.sonar_project_bug = sh(returnStdout: true, script: "cat resaults.log |grep bug |awk '{print \$3}'").trim()
              env.sonar_project_url = sh(returnStdout: true, script: "cat resaults.log |grep 详细 |awk '{print \$3}'").trim()
            }
          }
        }
      }
    }

    stage('镜像推送') {
      steps {
          sh '''
    docker tag ${imageName}:${imageVersion}-${type}-${cpu} 10.0.50.18:8082/${imageName}:${imageVersion}-${type}-${cpu}
    docker push 10.0.50.18:8082/${imageName}:${imageVersion}-${type}-${cpu}
          '''
      }
    }

    stage('日志推送') {
      steps {
        wrap([$class: 'BuildUser']) {
          script {
            BUILD_USER_ID = "${env.BUILD_USER_ID}"
            BUILD_USER = "${env.BUILD_USER}"
            BUILD_USER_EMAIL = "${env.BUILD_USER_EMAIL}"
          }
        }

        script {
          def toJson = {
          input ->
            groovy.json.JsonOutput.toJson(input)
          }
          def body = [
          'gitUrl':gitUrl,
          'gitCommitId':gitCommitId,
          'branche':branche,
          'imageName':imageName,
          'imageVersion':imageVersion,
          'cpu':cpu,
          'buildUser':BUILD_USER,
          'userEmail':BUILD_USER_EMAIL,
          'language':language,
          'type':type,
          'readme':fileExists('README.md'),
          'msg':env.msg,
          'sonarSmell':env.sonar_project_smell,
          'sonarVuln':env.sonar_project_vuln,
          'sonarBug':env.sonar_project_bug,
          'sonarUrl':env.sonar_project_url
        ]
          def unregister_url = 'http://10.0.50.15:7779/jenkins/build'
          response = httpRequest consoleLogResponseBody: true,
        contentType: 'APPLICATION_JSON',
        httpMode: 'POST',
        requestBody: toJson(body),
        url: unregister_url,
        validResponseCodes: '200'
          echo response.content
        }
      }
    }
  }
}
