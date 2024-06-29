#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 1000;
    }
    enroll_course(course) {
        this.courses.push(course);
    }
    view_balance() {
        console.log(chalk.greenBright(`\n Balance for ${this.name}: ${this.balance}`));
    }
    pay_fees(amount) {
        this.balance -= amount;
        console.log(chalk.greenBright(`\n ${amount} Fees Paid Successfully by ${this.name} `));
        console.log(chalk.greenBright(`Remaining Balance: ${this.balance}`));
    }
    show_status() {
        console.log(chalk.gray(`\n ID: ${this.id}`));
        console.log(chalk.gray(`Name: ${this.name}`));
        console.log(chalk.gray(`Courses: ${this.courses}`));
        console.log(chalk.gray(`Balance: ${this.balance}`));
    }
}
class Manager {
    Students;
    constructor() {
        this.Students = [];
    }
    add_student(name) {
        let student = new Student(name);
        this.Students.push(student);
        console.log(chalk.greenBright(`\n Student: ${name} added in the list successfully!! , Student ID: ${student.id}`));
    }
    enroll_student(student_id, course) {
        let foundStd = this.find_student(student_id);
        if (foundStd) {
            foundStd.enroll_course(course);
            console.log(chalk.greenBright(`\n ${foundStd.name} enrolled in ${course} course successfully!!`));
        }
    }
    view_student_balance(student_id) {
        let studentBal = this.find_student(student_id);
        if (studentBal) {
            studentBal.view_balance();
        }
        else {
            console.log(chalk.redBright("\n Student don`t found in the list!! PLease enter a correct Student ID.."));
        }
    }
    pay_student_fees(student_id, amount) {
        let studentFee = this.find_student(student_id);
        if (studentFee) {
            studentFee.pay_fees(amount);
        }
        else {
            console.log(chalk.redBright("\n Student don`t found in the list!! PLease enter a correct Student ID.."));
        }
    }
    show_student_status(student_id) {
        let studentStatus = this.find_student(student_id);
        if (studentStatus) {
            studentStatus.show_status();
        }
    }
    find_student(student_id) {
        return this.Students.find(std => std.id === student_id);
    }
}
// Main funtion to run the program..
async function main() {
    console.log(chalk.yellowBright("\n \t\t 1mr2joy6-Student-Management-System"));
    let studentClass = new Manager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.cyanBright("\n Please Select an Option:"),
                choices: [
                    "Add a New Student",
                    "Enroll a Student",
                    "Pay Student Fees",
                    "View Student Balance",
                    "Show Student Status",
                    "Exit"
                ]
            }
        ]);
        switch (choice.choice) {
            case "Add a New Student":
                let nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: chalk.cyan("Enter a Student Name:")
                    }
                ]);
                studentClass.add_student(nameInput.name);
                break;
            case "Enroll a Student":
                let enrollStd = await inquirer.prompt([
                    {
                        name: "id",
                        type: "number",
                        message: chalk.cyanBright("Enter a Student ID:")
                    },
                    {
                        name: "enroll",
                        type: "input",
                        message: chalk.cyanBright("Enter Course Name:")
                    }
                ]);
                studentClass.enroll_student(enrollStd.id, enrollStd.enroll);
                break;
            case "Pay Student Fees":
                let payFee = await inquirer.prompt([
                    {
                        name: "id",
                        type: "number",
                        message: chalk.cyanBright("Enter a Student ID:")
                    },
                    {
                        name: "fee",
                        type: "input",
                        message: chalk.cyanBright("Enter the Amount to Pay:")
                    }
                ]);
                studentClass.pay_student_fees(payFee.id, payFee.fee);
                break;
            case "View Student Balance":
                let stdBal = await inquirer.prompt([
                    {
                        name: "id",
                        type: "number",
                        message: chalk.cyanBright("Enter a Student ID:")
                    }
                ]);
                studentClass.view_student_balance(stdBal.id);
                break;
            case "Show Student Status":
                let stdStatus = await inquirer.prompt([
                    {
                        name: "stdStatus",
                        type: "number",
                        message: chalk.cyanBright("Enter a Student ID:")
                    }
                ]);
                studentClass.show_student_status(stdStatus.stdStatus);
                break;
            case "Exit":
                console.log(chalk.yellowBright("\n Thank You for using our 1mr2joy6-Student-Management-System Application!!"));
                ;
                console.log(chalk.magentaBright("-".repeat(90)));
                process.exit();
        }
    }
}
// calling Main function...
main();
