pipeline {
    agent any 
    environment {
    DOCKERHUB_CREDENTIALS = credentials('prasannakumarravichandran-dockerhub')
    }
    stages {
        stage('SCM Checkout') {
            steps{
            git 'https://github.com/prasannaravi/prasannaravi.git'
            }
        }
        stage('Build docker image') {
            steps {  
                sh 'docker build -t prasannakumarravichandran/nodeapp:$BUILD_NUMBER .'
            }
        }
        stage('login to dockerhub') {
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --dckr_pat_HB6j7rgZjjIOg47oYo_tEbLZj58-stdin'
            }
        }
        stage('push image') {
            steps{
                sh 'docker push prasannakumarravichandran/nodeapp:$BUILD_NUMBER'
            }
        }
}
post {
        always {
            sh 'docker logout'
        }
    }
}