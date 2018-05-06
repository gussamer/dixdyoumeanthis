#!/usr/bin/env node
'use strict'
var DixdYouMeanThis = function DixdYouMeanThis(){}

DixdYouMeanThis.spinnerChars = ["\\", "|", "/", "-"]
DixdYouMeanThis.spinnerIndex = 0
this.spinner = null

DixdYouMeanThis.isArgFlagOrDeclare = function isArgFlagOrDeclare(arg){
  return (arg.charAt(0)=='-' || arg.includes('='))
}

DixdYouMeanThis.findArgsStart = function findArgsStart(args){
  if(args){
    return args.findIndex(this.isArgFlagOrDeclare)
  }
  return false
}

DixdYouMeanThis.splitArgs = function splitArgs(splitIndex,args){
  var commands, dxArgs
  if(splitIndex>-1){
    commands = args.slice(0,splitIndex)
    dxArgs = args.slice(splitIndex)
  } else commands = args
  return {"commands":commands,"dxArgs":dxArgs}
}

DixdYouMeanThis.parseArgs = function parseArgs(args){
  if(args){
    this.nodeLocation = args.shift()
    this.scriptLocation = args.shift()
    if(args.length>0){
      var dxArgsStartIndex = this.findArgsStart.call(this,args)
      return this.splitArgs.call(this,dxArgsStartIndex,args)
    }
  }
  return {"commands":['force'],"dxArgs":['--help']}
}

DixdYouMeanThis.buildSfdxCommand = function buildSfdxCommand(commands,dxArgs){
  if(commands[0]!='force') commands.unshift('force')
  return 'sfdx '+commands.join(':')+(dxArgs ? ' '+dxArgs.join(' ') : '')
}

DixdYouMeanThis.formatSfdxCommand = function formatSfdxCommand(commands,dxArgs){
  if(commands && commands.length) return this.buildSfdxCommand(commands,dxArgs)
  else return 'sfdx force --help'
}

DixdYouMeanThis.spinnerStart = function spinnerStart(){
  this.spinnerCharIndex = 0
  this.spinner = setInterval((function spinnerInterval(){
    process.stdout.write('\r'+this.command+'... '+this.spinnerChars[this.spinnerIndex++])
    this.spinnerIndex &= 3
  }).bind(this),250)
}

DixdYouMeanThis.spinnerStop = function spinnerStop(){
  if(this.spinner){
    clearInterval(this.spinner)
    this.spinner = null
    console.log('')
  }
}

DixdYouMeanThis.sfdxCallback = function sfdxCallback(error,stdout,stderr){
  this.spinnerStop.call(this)
  if(error) console.log(error)
  else {
    if(stdout) console.log(stdout)
    if(stderr) console.log(stderr)
  }
}

DixdYouMeanThis.executeSfdx = function executeSfdx(command){
  this.spinnerStart.call(this)
  const { exec } = require('child_process')
  exec(command,this.sfdxCallback.bind(this))
}

DixdYouMeanThis.handleException = function handleException(ex){
  //parse error
  //if not bad command
  //  print pretty error
  //  print raw error
  //  ?switch to return json error or only return json no pretty
  //if bad command
  //  print your command is not recognize
  //  print your command
  //  print dixd you mean this?
  //  parse output of process for sfdx --help
  //  search command list for matching words to commands 
}

DixdYouMeanThis.run = function run(args){
  try{
    var parsedArgs = this.parseArgs.call(this,args)
    this.command = this.formatSfdxCommand.call(this,parsedArgs.commands,parsedArgs.dxArgs)
    this.executeSfdx.call(this,this.command)
  }catch(ex){
    this.spinnerStop.call(this)
    console.log(ex)
  }
}

DixdYouMeanThis.run(process.argv)