pipeline {
    agent any

    environment {
        // Credentials / config names (change if you use different IDs)
        DOCKERHUB_CREDS = credentials('dockerhub')    // provides DOCKERHUB_CREDS_USR and DOCKERHUB_CREDS_PSW
        SONAR_TOKEN = credentials('MySonarQubeServer')            // secret text credential
        SONARQUBE_SERVER = 'SonarQube'                      // name you configured in Jenkins -> Configure System
        SONAR_SCANNER_TOOL = 'SonarScanner'                // name in Global Tool Configuration
        DOCKERHUB_USER = 'wasim78'          // replace with your DockerHub username
        IMAGE_NAME = 'thought_app'                          // image repo name
        BUILD_TAG = "${env.BUILD_NUMBER ?: 'local'}"
    }

    options {
        // Keep only some builds if you want
        buildDiscarder(logRotator(numToKeepStr: '50'))
        timeout(time: 60, unit: 'MINUTES')
    }

    stages {
        stage('Checkout') {
            steps {
                // works when job is configured as "Pipeline script from SCM" or Multibranch
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // ensure sonar-scanner tool available
                    def scannerHome = tool name: "${SONAR_SCANNER_TOOL}", type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                    withSonarQubeEnv("${SONARQUBE_SERVER}") {
                        sh """
                            set -e
                            ${scannerHome}/bin/sonar-scanner \
                              -Dsonar.projectKey=${env.IMAGE_NAME} \
                              -Dsonar.sources=. \
                              -Dsonar.host.url=${env.SONAR_HOST_URL} \
                              -Dsonar.login=${SONAR_TOKEN}
                        """
                    }
                }
            }
        }

        stage('Wait for Quality Gate') {
            steps {
                // requires "Prepare SonarQube" and "Wait for Quality Gate" support via plugin
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Docker Cleanup (optional)') {
            steps {
                // safe remove of all containers/images to keep agent clean; won't fail pipeline if nothing found
                sh '''
                  set +e
                  echo "Stopping all containers (if any)..."
                  docker ps -aq | xargs -r docker stop
                  echo "Removing all containers (if any)..."
                  docker ps -aq | xargs -r docker rm -f
                  echo "Removing all images (if any)..."
                  docker images -aq | xargs -r docker rmi -f
                  set -e
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def tagVersion = "${DOCKERHUB_USER}/${IMAGE_NAME}:${BUILD_TAG}"
                    sh """
                      set -e
                      echo "Building image ${tagVersion}"
                      docker build -t ${tagVersion} .
                    """
                }
            }
        }

        stage('Tag latest') {
            steps {
                script {
                    sh """
                      set -e
                      docker tag ${DOCKERHUB_USER}/${IMAGE_NAME}:${BUILD_TAG} ${DOCKERHUB_USER}/${IMAGE_NAME}:latest || true
                    """
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                sh """
                  set -e
                  echo "${DOCKERHUB_CREDS_PSW}" | docker login -u "${DOCKERHUB_CREDS_USR}" --password-stdin
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                sh """
                  set -e
                  docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:${BUILD_TAG}
                  docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:latest || true
                """
            }
        }

        stage('Logout Docker Hub') {
            steps {
                sh 'docker logout || true'
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline finished: image pushed -> ${DOCKERHUB_USER}/${IMAGE_NAME}:${BUILD_TAG} (and :latest)"
        }
        failure {
            echo "❌ Pipeline failed. Check console output."
        }
        always {
            // optional: perform small cleanup, show image list
            sh '''
              echo "Docker images on agent (short):"
              docker images --format "{{.Repository}}:{{.Tag}} {{.ID}}" || true
            '''
        }
    }
}





