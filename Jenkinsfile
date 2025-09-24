pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "wasimakram7/thought_app"      // your DockerHub repo
        DOCKER_CREDENTIALS = credentials('dockerhub') // Jenkins credentials ID for DockerHub
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Wasimakram7/thought_app.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') { // Name from Manage Jenkins → Configure System
                    withSonarQubeScannerInstallation('SonarScanner') { // Name from Global Tool Config
                        sh """
                        sonar-scanner \
                          -Dsonar.projectKey=thought_app \
                          -Dsonar.sources=. \
                          -Dsonar.host.url=http://<your-sonarqube-ip>:9000
                        """
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE:$BUILD_NUMBER .'
                }
            }
        }

        stage('Trivy Security Scan') {
            steps {
                script {
                    // Trivy must be installed on the Jenkins server/agent
                    sh '''
                    echo "🔍 Running Trivy Scan..."
                    trivy image --exit-code 1 --severity HIGH,CRITICAL $DOCKER_IMAGE:$BUILD_NUMBER || true
                    '''
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                script {
                    sh "echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh 'docker push $DOCKER_IMAGE:$BUILD_NUMBER'
                    sh 'docker tag $DOCKER_IMAGE:$BUILD_NUMBER $DOCKER_IMAGE:latest'
                    sh 'docker push $DOCKER_IMAGE:latest'
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker logout || true'
            }
        }
        failure {
            echo "❌ Pipeline failed!"
        }
        success {
            echo "✅ Pipeline completed successfully!"
        }
    }
}
