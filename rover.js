class Rover {
    constructor(position, mode = 'NORMAL', generatorWatts = 110) {
        this.mode = mode;
        this.generatorWatts = generatorWatts;
        this.position = position;
    }

    receiveMessage(message) {
      let response = {
        message : message.name,
        results : []
      };


      for (const command of message.commands) {

        let commandExecution = {};

            if(command.commandType === 'STATUS_CHECK') {
            
              const roverStatus = {};

                roverStatus.mode = this.mode;
                roverStatus.generatorWatts = this.generatorWatts;
                roverStatus.position = this.position;
                commandExecution.completed = true;
                commandExecution.roverStatus = roverStatus

          } else if(command.commandType === 'MODE_CHANGE') {

              if (command.value === 'LOW_POWER' || command.value === 'NORMAL') {

                this.mode = command.value;
                commandExecution.completed = true;        
              
              } else { commandExecution.completed = false;
                  
              }

          } else if(command.commandType === 'MOVE') {

              if(this.mode === 'NORMAL'){

                this.position = command.value;
                commandExecution.completed = true;
              }else {
            commandExecution.completed = false;
          }

          } else {
            commandExecution.completed = false;
          }

          response.results.push(commandExecution);
      }

      return response;

    };

};

module.exports = Rover;