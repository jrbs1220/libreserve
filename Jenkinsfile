pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'libreserve'
        TAG = "${env.BUILD_NUMBER}"
    }

    triggers {
        pollSCM('H/2 * * * *')
    }

    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '15'))
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Test') {
            steps {
                sh 'docker build --target test -t libreserve/catalog-api:test ./catalog-api'
            }
        }

        stage('Build Images') {
            steps { sh 'docker compose build' }
        }

        stage('Deploy') {
            steps {
                withCredentials([file(credentialsId: 'libreserve-env', variable: 'ENV_FILE')]) {
                    sh 'cp "$ENV_FILE" .env'
                    sh 'docker compose up -d --no-build --remove-orphans'
                }
            }
        }

        stage('Smoke Test') {
            steps {
                sh '''
                for i in $(seq 1 12); do
                    if docker compose exec -T proxy wget -qO- http://proxy/api/catalog/health; then
                        echo "Smoke test passed!"
                        exit 0
                    fi
                    echo "Waiting for services..."
                    sleep 5
                done
                echo "Smoke test failed!"
                exit 1
                '''
            }
        }
    }

    post {
        always { sh 'rm -f .env' }
    }
}
