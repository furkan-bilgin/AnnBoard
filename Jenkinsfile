node {
    def app

    stage("Clear workspace") {
        sh "rm -r *"
    }

    stage("Clone repository") {
        checkout scm
    }

    stage("Move source code") {
        sh "mkdir _docker/app/"
        sh "rsync -av . _docker/app/ --exclude _docker --exclude .git"
    }

    stage("Build image") {
        /* This builds the actual image; synonymous to
         * docker build on the command line */
        dir("_docker") {
            app = docker.build("jenkins-ann:${BUILD_NUMBER}")
        }
    }

    stage("Push image") {
        sh "docker login -u ${DO_TOKEN} -p ${DO_TOKEN} registry.digitalocean.com"

        sh "docker tag jenkins-ann:${BUILD_NUMBER} registry.digitalocean.com/REGISTRY_NAME/ann:${BUILD_NUMBER}"
        sh "docker tag jenkins-ann:${BUILD_NUMBER} registry.digitalocean.com/REGISTRY_NAME/ann:latest"

        sh "docker push registry.digitalocean.com/REGISTRY_NAME/ann:${BUILD_NUMBER}"
        sh "docker push registry.digitalocean.com/REGISTRY_NAME/ann:latest"
    }

    stage("Remove image") {
        sh "docker image rm -f registry.digitalocean.com/REGISTRY_NAME/ann:${BUILD_NUMBER}"
        sh "docker image rm -f registry.digitalocean.com/REGISTRY_NAME/ann:latest"
        sh "docker image rm -f jenkins-ann:${BUILD_NUMBER}"
    }

    stage("Update image") {
        sh "kubectl set image deployments/ann ann=registry.digitalocean.com/REGISTRY_NAME/ann:${BUILD_NUMBER}"
    }
}