pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub') 
        DOCKERHUB_USER = 'your-dockerhub-username'
        IMAGE_NAME = 'thought_app'
    }

    stages {
        stage('Checkout') {
            steps {
                // works only in "Pipeline script from SCM"
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                docker build -t ${DOCKERHUB_USER}/${IMAGE_NAME}:${env.BUILD_NUMBER} .
                """
            }
        }

        stage('Login to DockerHub') {
            steps {
                sh """
                echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                sh """
                docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:${env.BUILD_NUMBER}
                """
            }
        }
    }

    post {
        success {
            echo "✅ Build & Push successful!"
        }
        failure {
            echo "❌ Pipeline failed!"
        }
    }
}

