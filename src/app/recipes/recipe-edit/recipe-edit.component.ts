import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { RecipeService } from '../recipe.service';

// Accept whole numbers and decimals (e.g. 1, 1.5, 0.25, 0.5) for quantities.
const AMOUNT_PATTERN = /^\d+(\.\d+)?$/;

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit{

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
      );
    }

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit() {
    // Show validation feedback instead of silently doing nothing when the form
    // is incomplete or an ingredient amount is invalid.
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      return;
    }

    // Guests can build a recipe to see how the app works, but saving it
    // ("storing the data") requires an account. Stash the draft and send them
    // to authenticate; it is committed automatically once they log in.
    if (!this.authService.isAuthenticated) {
      this.recipeService.pendingRecipe = {
        id: this.editMode ? this.id : null,
        recipe: this.recipeForm.value,
      };
      this.router.navigate(['/auth'], {
        queryParams: { reason: 'save-recipe' },
      });
      return;
    }

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(AMOUNT_PATTERN)
        ])
      })
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']) {
        for(let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup(
              {
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(AMOUNT_PATTERN)])
              }
            )
          );
        }
      }
    }
    this.recipeForm = new FormGroup(
      {
        'name': new FormControl(recipeName, Validators.required),
        // Image is optional — recipes without one show a placeholder image.
        'imagePath': new FormControl(recipeImagePath),
        'description': new FormControl(recipeDescription, Validators.required),
        'ingredients': recipeIngredients
      }
    );
  }

}
