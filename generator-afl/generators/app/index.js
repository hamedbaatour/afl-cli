'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const logSymbols = require('log-symbols');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.option('init');
    this.option('material')
  }

  initializing() {
    if (this.options.init) {
      this.npmInstall(['angularfire-lite', 'firebase']);
    } else if (this.options.material) {
      this.npmInstall(['@angular/material', '@angular/cdk', '@angular/animations', 'hammerjs']);
    } else if (this.options.material && this.options.init) {
      this.npmInstall(['angularfire-lite', 'firebase', '@angular/material', '@angular/cdk', '@angular/animations', 'hammerjs']);
    }
  }

  _init(configObj) {
    this.fs.copyTpl(
      this.templatePath(this.props.type + '.ts'),
      this.destinationPath('src/app/app.module.ts'),
      {
       config: configObj
      });
    this.log(logSymbols.info, chalk.bold('app.module.ts'), chalk.blueBright('updated!'));
  }


  prompting() {
    this.log(chalk.redBright.underline.bold('\n Welcome to the fastest way to use Firebase with Angular'));
    const welcome = chalk.cyanBright(`
        ##           ##########     ##       CLI V5.0 🙌
      ##  ##         ##             ##
     ##    ##        ##########     ##
    ##########       ##             ##
   ##        ##      ##             ##
  ##          ##     ##             ######### 
    `);

    this.log(welcome);

    if (this.options.init) {
      return this.prompt([{
        type: 'input',
        name: 'config',
        message: chalk.cyan('Paste your Firebase project config (should be an object):')
      }]).then((answer) => {
        this._init(answer)
      })
    }


    return this.prompt([
      {
        type: 'list',
        name: 'type',
        message: chalk.yellowBright.bold('Which Firebase service you want to use?'),
        choices: ['Authentication', 'Firestore', 'Realtime Database', 'Storage', 'Cloud Messaging'],
        default: ['Authentication']
      },
      {
        when: function(response) {
          return response.type === 'Authentication'
        },
        type: 'list',
        name: 'auth_type',
        message: chalk.yellowBright.bold('Which type of authentication components you want to generate?'),
        choices: ['Login', 'Signup', 'Reset Password', 'Reset Email', 'User Profile', 'All'],
        default: ['Login']
      },
      {
        when: function (response) {
          return response.type === 'Firestore'
        },
        type: 'list',
        name: 'auth_type',
        message: chalk.yellowBright.bold('Which type of Firestore components you want to generate?'),
        choices: ['Read', 'Write', 'Delete', 'All'],
        default: ['Login']
      },
      {
        type: 'input',
        name: 'name',
        message: chalk.yellowBright.bold('What is the component name?')
      },
      {
        type: 'input',
        name: 'path',
        message: chalk.yellowBright.bold('Provide a path:'),
      },
      {
        type: 'checkbox',
        name: 'path',
        choices: ['Yes', 'No'],
        message: chalk.yellowBright.bold('Do you want to ?'),
      }
    ]).then((answers) => this.props = answers);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(this.props.type + '.ts'),
      this.destinationPath('src/app/' + (this.props.path ? this.props.path + '/' : '') + this.props.name + '/' + this.props.name + '.component.ts'),
      {
        cn: this.props.name,
        cn_camel: this.props.name[0].toUpperCase() + this.props.name.substring(1, this.props.name.length)
      },
      undefined,
      undefined,
      {stat: false, silent: true}
    );
    this.log('\n ------------------ \n');
    this.log(logSymbols.success, chalk.green('generated!'), chalk.bold(this.props.name + '.component.ts'));
    this.log(logSymbols.success, chalk.green('generated!'), chalk.bold(this.props.name + '.component.css'));
    this.log(logSymbols.success, chalk.green('generated!'), chalk.bold(this.props.name + '.component.html'));
    this.log(logSymbols.info, chalk.bold('app' + '.module.ts'), chalk.blueBright('updated!'));
  }

};
