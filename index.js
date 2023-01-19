class Recipe {
    constructor(name, cost, calorie) {
        this.name = name;
        this.cost = cost;
        this.calorie = calorie;
    }

    describe() {
        return `${this.name} costs ${this.cost} and has ${this.calorie} calories.`
    }
}

class Type {
    constructor(name) {
        this.name = name;
        this.recipes = [];
    }
   
    addRecipe(recipe) {
        if (recipe instanceof Recipe) {
            this.recipes.push(recipe);
        }else {
            throw new Error('You can only add an instance of Recipe. Argument is not a recipe: ${recipe}');
        }
    }
    
    describe() {
        return '${this.name} has ${this.recipes.length} many recipes to choose from.';
    }
}

class Menu {
    constructor() {
        this.types = [];
        this.selectedType = null;
    }
    
    start() {
        let selection = this.showMainMenuOptions();
        
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createType();
                    break;
                case '2':
                    this.viewType();
                    break;
                case '3':
                    this.deleteType();
                    break;
                case '4':
                    this.displayTypes();
                    break;
                default:
                    selection = 0
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) create new food type
            2) view food type
            3) delete food type
            4) display all food types
        `)
    }

    showTypeMenuOptions(typeInfo) {
      return prompt(`
        0) back
        1) create recipe
        2) delete recipe
        ------------------
        ${typeInfo}
      `);
    }
    displayTypes() {
        let typeString = "";
        for (let i = 0; i < this.types.length; i++) {
            typeString += i + ') ' + this.types[i].name + '\n';
        }
        alert(typeString);
    }

    createType() {
        let name = prompt('Enter name for new type of food:');
        this.types.push(new Type(name));
    }

    viewType() {
        let index = prompt('Enter the index of the type of food you wish to view:');
        if (index > -1 && index < this.types.length) {
            this.selectedType = this.types[index];
            let description = 'Food Type Name: ' + this.selectedType.name + '\n';

            for (let i = 0; i < this.selectedType.recipes.length; i++) {
                description += i + ') ' + this.selectedType.recipes[i].name + ' - $' + this.selectedType.recipes[i].cost + ' - ' + this.selectedType.recipes[i].calorie +'\n';
            }

            let selection = this.showTypeMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createRecipe();
                    break;
                case '2':
                    this.deleteRecipe();
                    break;
                           }
        }
    }
    
    deleteType() {
        let index = prompt('Enter the index of the type of food you wish to delete:');
        if (index > -1 && index < this.types.length) {
            this.types.splice(index, 1);
        }
    }
    createRecipe() {
        let name = prompt('Enter name for new recipe:');
        let cost = prompt('Enter cost for new recipe:');
        let calorie = prompt('Enter the number of calories for new recipe:');
        this.selectedType.recipes.push(new Recipe(name, cost, calorie));
    }
    deleteRecipe() {
        let index = prompt('Enter the index of the recipe you wish to delete:');
        if (index > -1 && index < this.selectedType.recipes.length) {
            this.selectedType.recipes.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();
