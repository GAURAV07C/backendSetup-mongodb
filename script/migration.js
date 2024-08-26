const { exec } = require('child_process')

// Command Line Arguments
const command = process.argv[2]
const migrationName = process.argv[3]

// Valid Migration Commands
const validCommands = ['create', 'up', 'down', 'list', 'prune']
if (!validCommands.includes(command)) {
    console.error(`Invalid command: Command must be one of ${validCommands}`)
    process.exit(0)
}

const commandsWithoutMigrationNameRequired = ['list', 'prune']
if (!commandsWithoutMigrationNameRequired.includes(command)) {
    if (!migrationName) {
        console.error('Migration name is required')
        process.exit(0)
    }
}

function runNpmScript() {
    return new Promise((resolve, reject) => {
        let execCommand = ``

        if (commandsWithoutMigrationNameRequired.includes(command)) {
            execCommand = `migrate --uri ${process.env.MIGRATE_MONGO_URL} ${command}`
        } else {
            execCommand = `migrate --uri ${process.env.MIGRATE_MONGO_URL} ${command} ${migrationName}`
        }

        const childProcess = exec(execCommand, (error, stdout) => {
            if (error) {
                reject(`Error running script: ${error}`)
            } else {
                resolve(stdout)
            }
        })

        childProcess.stderr.on('data', (data) => {
            console.error(data)
        })
    })
}

// Example usage:
runNpmScript()
    .then((output) => {
        console.info(output)
    })
    .catch((error) => {
        console.error('Error:', error)
    })
