class Cat {                                             ///this app is a Menu driven app using prompts that allows you to manage cats and owners
    constructor(name, gender, color, hairlength) {      // cats will take those details
        this.name = name;
        this.gender = gender;
        this.color = color;
        this.hairlength = hairlength;
    }

    describe() {                                        /// to describe information about the cats
        return `My name is ${this.name}, I am ${this.gender} ${this.color} ${this.hairlength} cat and your new family.`;

    }
}

class Owner {                           
    constructor(fullName) {
        this.fullName = fullName;
        this.cats = [];                 
    }

    addCat(cat) {                                       /// push method, one owner's cat(s) will go intto the cats array
        if (cat instanceof Cat) {
            this.cats.push(cat);     
        }   else {
            throw new Error(`You can only adopt an instance of cat. Argument is not a cat: ${cat}`); 
        }
    }

    describe() {                                        /// to describe information about the Owner
        return `${this.fullName} has ${this.cats.length} cats in the house!.`;
    }
}

class Menu {                                            /// this class is menu itself which drives application
    constructor() {
        this.owners = [];                               /// as we have multiple owners in this app, owners are going to the owners array
        this.selectedOwner = null;                      // null because no owner was selected in the beginning
    }

    start() {                                           /// start is the entry point of the app
        let selection = this.showMainMenuOptions();
        while(selection != 0) {                         /// while loop = as long as user dont select 0,
            switch(selection) {
                case '1':                               /// one of those will be implemented 
                    this.createOwner();
                    break;
                case '2':
                    this.viewOwner();
                    break;
                case '3':
                    this.deleteOwner();
                    break;
                case '4':
                    this.displayOwners();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert(`Goodbye, have a meowonderful day!`);
    }

    showMainMenuOptions() {                              /// template popup in the first menu prompt which user actually see to select the menu
        return prompt(`
        0) exit
        1) create a new owner
        2) view a owner
        3) delete a owner
        4) display all owners
        `);
    }

    showOwnerMenuOptions(ownerInfo) {                   /// template popup in the sub menu prommpt of "view a owner" after user imput has occured 
        return prompt(`
        0) back to Main Menu
        1) add a new cat info
        2) delete a cat info
        --------------------------- 
        ${ownerInfo} 
        `);
    }                                                   /// under the lines, display the cats info that was passed in
                                                        /// below here is the each MainMenuOptions
    createOwner() {
        let fullName = prompt('Enter your fullname for registration: ');        // instruction for the user to fill the owneres information
        this.owners.push(new Owner(fullName));                                  /// push method to push new owners into the owners array
    }

    viewOwner() {
        let index = prompt('Enter the index number of the owner you want to view: ');       // instruction for the user to fill
        if (index > -1 && index < this.owners.length) {                                     /// if statement is to find the owner which the user selected to view
            this.selectedOwner = this.owners[index];
            let description = 'Owner Name: ' + this.selectedOwner.fullName + '\n';

            for (let i = 0; i < this.selectedOwner.cats.length; i++) {                      /// add discriptions of all the cats to the owner
                description += i + ') ' + this.selectedOwner.cats[i].name + ' - ' + this.selectedOwner.cats[i].gender + ' - ' + this.selectedOwner.cats[i].color  + ' - ' + this.selectedOwner.cats[i].hairlength + '\n';
            }

            let selection1 = this.showOwnerMenuOptions(description);                        /// sub menu of the "view a owner" linking to "show owner menu options"
            switch(selection1) {
                case '1':
                    this.createCat();
                    break;
                case '2':
                    this.deleteCat();
                    break;
            }
        }
    }

    deleteOwner() {
        let index = prompt('Enter the index number of the owner you wish to delete: ');     // instruction for user to fill 
        if (index > -1 && index < this.owners.length) {
            this.owners.splice(index,1);                                                    /// suplice method will remove owners whichever user wished for
        }
    }

    displayOwners() {
        let ownerString = '';                                               /// blank string means we will build up the string to display owners name 
        for (let i = 0; i < this.owners.length; i++) {
            ownerString += i + ') ' + this.owners[i].fullName + '\n';       /// for loop : concatinate all owners info in the different line
        }
        alert(ownerString);                                                 /// we will be able to see all the owners
    }

    createCat() {
        let name = prompt('Enter name for a new cat: ');                    // create all the cat details in the sub menu of the "view owner"
        let gender = prompt('Enter the gender of a new cat');
        let color = prompt('Enter the color of a new cat');
        let hairlength = prompt('Enter the hairlength of a new cat');
        this.selectedOwner.addCat(new Cat(name, gender, color, hairlength));
    }

    deleteCat() {                                                           // delete the cat info with splice method in the sub menu of the "view owner"
        let index = prompt('Enter the index number of the cat info that you wish to delete: ');
        if (index > -1 && index < this.selectedOwner.cats.length) {
            this.selectedOwner.cats.splice(index,1);
        }
    }
}
let menu = new Menu();              /// using "new" operator invoked the all constructors
menu.start();                       /// call method that showes everything we coded above