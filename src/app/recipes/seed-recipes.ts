import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

// Dummy recipes seeded for demo/testing so the app has content to browse
// without a populated backend. Data adapted from TheMealDB (themealdb.com).
export const SEED_RECIPES: Recipe[] = [
  new Recipe(
    'Pancakes',
    'Put the flour, eggs, milk, 1 tbsp oil and a pinch of salt into a bowl or large jug, then whisk to a smooth batter. Set aside for 30 mins to rest if you have time, or start cooking straight away. Set a medium frying pan or crêpe pan over a medium heat and caref',
    'https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg',
    [
      new Ingredient('Flour (100g)', 1),
      new Ingredient('Eggs (2 large)', 1),
      new Ingredient('Milk (300ml)', 1),
      new Ingredient('Sunflower Oil (1 tbls)', 1),
      new Ingredient('Sugar (to serve)', 1),
      new Ingredient('Raspberries (to serve)', 1),
      new Ingredient('Blueberries (to serve)', 1),
    ]
  ),
  new Recipe(
    'Cassava pizza',
    'Preheat the oven to 200ºC. Cut the bacon or chorizo into medium pieces and the paprika into strips. Spread a little tomato sauce and mozzarella cheese on each portion of cassava. Add the bacon or chorizo, corn, turkey ham, some olives and paprika. Bake for 7 t',
    'https://www.themealdb.com/images/media/meals/lrfdwz1764438393.jpg',
    [
      new Ingredient('Casabe (6 cut thick slices)', 1),
      new Ingredient('Tomato Sauce (450g)', 1),
      new Ingredient('Chorizo (225g)', 1),
      new Ingredient('Turkey Ham (225g)', 1),
      new Ingredient('Sweetcorn (75g)', 1),
      new Ingredient('Green Olives (40g)', 1),
      new Ingredient('Paprika (55g)', 1),
      new Ingredient('Mozzarella (50g)', 1),
    ]
  ),
  new Recipe(
    'Spaghetti Bolognese',
    'Put the onion and oil in a large pan and fry over a fairly high heat for 3-4 mins. Add the garlic and mince and fry until they both brown. Add the mushrooms and herbs, and cook for another couple of mins. Stir in the tomatoes, beef stock, tomato ketchup or pur',
    'https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg',
    [
      new Ingredient('onions (2)', 1),
      new Ingredient('olive oil (1tbsp)', 1),
      new Ingredient('garlic (1 clove)', 1),
      new Ingredient('lean minced beef (500g)', 1),
      new Ingredient('mushrooms (90g)', 1),
      new Ingredient('dried oregano (1tsp)', 1),
      new Ingredient('tomatoes (400g can)', 1),
      new Ingredient('hot beef stock (300ml)', 1),
    ]
  ),
  new Recipe(
    'Chicken Handi',
    'Take a large pot or wok, big enough to cook all the chicken, and heat the oil in it. Once the oil is hot, add sliced onion and fry them until deep golden brown. Then take them out on a plate and set aside. To the same pot, add the chopped garlic and sauté for',
    'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',
    [
      new Ingredient('Chicken (1.2 kg)', 1),
      new Ingredient('Onion (5 thinly sliced)', 1),
      new Ingredient('Tomatoes (2 finely chopped)', 1),
      new Ingredient('Garlic (8 cloves chopped)', 1),
      new Ingredient('Ginger paste (1 tbsp)', 1),
      new Ingredient('Vegetable oil (¼ cup)', 1),
      new Ingredient('Cumin seeds (2 tsp)', 1),
      new Ingredient('Coriander seeds (3 tsp)', 1),
    ]
  ),
  new Recipe(
    'Beef pho',
    'step 1 Tip the beef stock along with 500ml of water into a large saucepan. Sit the onion and ginger in a frying pan over a high heat and char on all sides, around 3-5 mins (you can also do this under your grill). Once charred, add to the beef stock. In the sam',
    'https://www.themealdb.com/images/media/meals/pbzcrx1763765096.jpg',
    [
      new Ingredient('Beef Stock (1 L)', 1),
      new Ingredient('Onion (1 large)', 1),
      new Ingredient('Ginger (1 Large Chopped)', 1),
      new Ingredient('Cinnamon Stick (1)', 1),
      new Ingredient('Star Anise (2)', 1),
      new Ingredient('Coriander Seeds (1 tsp)', 1),
      new Ingredient('Cloves (1/2 teaspoon)', 1),
      new Ingredient('Sirloin steak (225g)', 1),
    ]
  ),
  new Recipe(
    'Chicken Quinoa Greek Salad',
    'Cook the quinoa following the pack instructions, then rinse in cold water and drain thoroughly. Meanwhile, mix the butter, chilli and garlic into a paste. Toss the chicken fillets in 2 tsp of the olive oil with some seasoning. Lay in a hot griddle pan and cook',
    'https://www.themealdb.com/images/media/meals/k29viq1585565980.jpg',
    [
      new Ingredient('Quinoa (225g)', 1),
      new Ingredient('Butter (25g)', 1),
      new Ingredient('Red Chilli (1 chopped)', 1),
      new Ingredient('Garlic (1 clove finely chopped)', 1),
      new Ingredient('Chicken Breast (400g)', 1),
      new Ingredient('Olive Oil (2 tbs)', 1),
      new Ingredient('Black Olives (Handful)', 1),
      new Ingredient('Red Onions (1 chopped)', 1),
    ]
  ),
  new Recipe(
    'Vegan Chocolate Cake',
    'Simply mix all dry ingredients with wet ingredients and blend altogether. Bake for 45 min on 180 degrees. Decorate with some melted vegan chocolate',
    'https://www.themealdb.com/images/media/meals/qxutws1486978099.jpg',
    [
      new Ingredient('Self-raising Flour (1 1/4 cup)', 1),
      new Ingredient('coco sugar (1/2 cup)', 1),
      new Ingredient('cacao (1/3 cup raw)', 1),
      new Ingredient('baking powder (1 tsp)', 1),
      new Ingredient('flax eggs (2)', 1),
      new Ingredient('almond milk (1/2 cup)', 1),
      new Ingredient('vanilla (1 tsp)', 1),
      new Ingredient('water (1/2 cup boiling)', 1),
    ]
  ),
  new Recipe(
    'Lasagne',
    'Heat the oil in a large saucepan. Use kitchen scissors to snip the bacon into small pieces, or use a sharp knife to chop it on a chopping board. Add the bacon to the pan and cook for just a few mins until starting to turn golden. Add the onion, celery and carr',
    'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
    [
      new Ingredient('Olive Oil (1 tblsp)', 1),
      new Ingredient('Bacon (2)', 1),
      new Ingredient('Onion (1 finely chopped)', 1),
      new Ingredient('Celery (1 Stick)', 1),
      new Ingredient('Carrots (1 medium)', 1),
      new Ingredient('Garlic (2 cloves chopped)', 1),
      new Ingredient('Minced Beef (500g)', 1),
      new Ingredient('Tomato Puree (1 tbls)', 1),
    ]
  ),
  new Recipe(
    'Sushi',
    'STEP 1 TO MAKE SUSHI ROLLS: Pat out some rice. Lay a nori sheet on the mat, shiny-side down. Dip your hands in the vinegared water, then pat handfuls of rice on top in a 1cm thick layer, leaving the furthest edge from you clear. STEP 2 Spread over some Japanes',
    'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
    [
      new Ingredient('Sushi Rice (300ml)', 1),
      new Ingredient('Rice wine (100ml)', 1),
      new Ingredient('Caster Sugar (2 tbs)', 1),
      new Ingredient('Mayonnaise (3 tbs)', 1),
      new Ingredient('Rice wine (1 tbs)', 1),
      new Ingredient('Soy Sauce (1 tbs)', 1),
      new Ingredient('Cucumber (1)', 1),
    ]
  ),
  new Recipe(
    'Fish pie',
    '01.Put the potatoes in a large pan of cold salted water and bring to the boil. Lower the heat, cover, then simmer gently for 15 minutes until tender. Drain, then return to the pan over a low heat for 30 seconds to drive off any excess water. Mash with 1 tbsp o',
    'https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg',
    [
      new Ingredient('Floury Potatoes (900g)', 1),
      new Ingredient('Olive Oil (2 tbsp)', 1),
      new Ingredient('Semi-skimmed Milk (600ml)', 1),
      new Ingredient('White Fish Fillets (800g)', 1),
      new Ingredient('Plain flour (1 tbsp)', 1),
      new Ingredient('Nutmeg (Grating)', 1),
      new Ingredient('Double Cream (3 tbsp)', 1),
      new Ingredient('Jerusalem Artichokes (200g)', 1),
    ]
  ),
];
