const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

        it("constructor sets position and default values for mode and generatorWatts", function(){
    
            const testRover = new Rover(1337)

              expect(testRover.position).toBe(1337);
              expect(testRover.mode).toBe('NORMAL');
              expect(testRover.generatorWatts).toBe(110);
  })

        it('response returned by receiveMessage contains name of message', function() {
              const testRover = new Rover(1337);
              const testCommand = [new Command('STATUS_CHECK')];
              const testMessage = new Message('THIS IS A TEST', testCommand);
              
                expect(testRover.receiveMessage(testMessage).message).toBe(testMessage.name);
                
    });

        it('response returned by receiveMessage includes two results if two commands are sent in the message', function() {

              const testRover = new Rover(1337)
              const testCommands = [
                new Command('MOVE', 1000),
                new Command('STATUS_CHECK'),
              ];
              const testMessage = new Message('THIS IS A TEST', testCommands)
              expect(testRover.receiveMessage(testMessage).results.length).toBe(testCommands.length);

    });

        it('responds correctly to status check command', function() {

              const testRover = new Rover(1337)
              const testCommands = [
                new Command('MOVE', 1000),   //lifted these off of studentgrade.spec :-)
                new Command('STATUS_CHECK'),
              ];
              const testMessage = new Message('THIS IS A TEST', testCommands)
              
              expect(testRover.receiveMessage(testMessage).results).toContain(
                {
                 completed: true,
                 roverStatus: { mode: 'NORMAL', generatorWatts: 110, position: 1000 }}
              )

    });


        it('responds correctly to mode change command', function() {

          const testRover = new Rover(1337);
          const testCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 1000)]
          const testMessage = new Message('THIS IS A TEST', testCommands);

          expect(testRover.receiveMessage(testMessage).results).toContain({completed : true},{completed: false});

    });

    it('responds with false completed value when attempting to move in LOW_POWER mode', function() {

        const testRover = new Rover(1337);
        
        const testCommands = [
            new Command('MODE_CHANGE', 'LOW_POWER'),
            new Command('MOVE', 1000)
        ];

        const testMessage = new Message('THIS IS A TEST!', testCommands);

        expect(testRover.receiveMessage(testMessage).results).toContain({completed : true},{completed: false});

    });

        it('responds with position for move command', function() {

        const testRover = new Rover(1337);
        const testCommand = [new Command('MOVE', 100)];
        const testMessage = new Message('THIS IS A TEST!', testCommand);

        testRover.receiveMessage(testMessage);

        expect(testRover.position).toBe(100);
    });
    

  

});
