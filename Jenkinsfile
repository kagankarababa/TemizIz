pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Kaynak kod başarıyla alındı.'
            }
        }

        stage('Verify') {
            steps {
                sh 'docker --version'
                sh 'docker-compose --version || docker compose version'
                echo 'Docker ve Docker Compose doğrulandı.'
            }
        }

        stage('Docker Permission') {
            steps {
                sh 'sudo chmod 666 /var/run/docker.sock || true'
                echo 'Docker socket izinleri ayarlandı.'
            }
        }

        stage('Build') {
            steps {
                sh 'docker-compose build --no-cache'
                echo 'Docker imajları başarıyla oluşturuldu.'
            }
        }

        stage('Stop') {
            steps {
                sh 'docker-compose down --remove-orphans || true'
                echo 'Eski konteynerler durduruldu.'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
                echo 'Konteynerler başlatıldı.'
            }
        }

        stage('Health Check') {
            steps {
                sh 'sleep 20'
                sh 'curl -f http://localhost:3000/v1/health || exit 1'
                sh 'curl -f http://localhost:5173 || exit 1'
                echo 'Sağlık kontrolleri başarılı!'
            }
        }
    }

    post {
        success {
            echo 'Pipeline başarıyla tamamlandı! ✅'
        }
        failure {
            echo 'Pipeline başarısız oldu! ❌'
            sh 'docker-compose logs --tail=50 || true'
        }
        always {
            echo 'Pipeline sona erdi.'
        }
    }
}
