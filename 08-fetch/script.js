// Kata 8: Fetch
// Ask a server for data (GET), send it data (POST), and handle the bad days.
// The recipes look like DummyJSON's: https://dummyjson.com/docs/recipes

// A recipe, the way the server sends it back (after response.json()).
const sampleRecipe = {
  id: 1,
  name: "Classic Margherita Pizza",
  cuisine: "Italian",
  prepTimeMinutes: 20,
  cookTimeMinutes: 15,
  ingredients: ["Pizza dough", "Tomato sauce", "Fresh mozzarella", "Basil"],
};

// ---------- Drill A: look before you use it ----------
// Example: pick one field out of the recipe.
function recipeTitle(recipe) {
  return recipe.name;
}
console.log("Example:", recipeTitle(sampleRecipe)); // "Classic Margherita Pizza"

// Rep 1: return the name, then the cuisine in brackets.
//   recipeLine(sampleRecipe)  →  "Classic Margherita Pizza (Italian)"

function recipeLine(recipe) {
  return recipe.name + " (" + recipe.cuisine + ")";
}

// Rep 2: write a function called totalTime(recipe) that returns the prep time PLUS the cook time.
//   totalTime(sampleRecipe)  →  35

function totalTime(recipe) {
  return recipe.prepTimeMinutes + recipe.cookTimeMinutes;
}

// Rep 3: write a function called firstIngredient(recipe) that returns the first ingredient.
//   firstIngredient(sampleRecipe)  →  "Pizza dough"

function firstIngredient(recipe) {
  return recipe.ingredients[0];
}

// ---------- Drill B: status codes ----------
// Every answer has a status. 200s = it worked. 400s = you asked wrong. 500s = the server broke.
// Example: is it "Not found"?
function isNotFound(status) {
  return status === 404;
}

// Rep 1: write a function called isOk(status) that returns true for 200 to 299, and false otherwise.
// (That's exactly what response.ok tells you.)
// New: >= means "at least", <= means "at most", and && means AND (both sides must be true).
//   Example: price >= 2 && price <= 10   is true for 2, 5 and 10, false for 1 and 12.
//   isOk(200) → true    isOk(201) → true    isOk(404) → false    isOk(500) → false

function isOk(status) {
  return status >= 200 && status <= 299;
}

// Rep 2: write a function called statusMessage(status) that returns:
//   200 → "Found it"    201 → "Made it"    404 → "Not found"    anything else → "Something went wrong"

function statusMessage(status) {
  if (status === 200) return "Found it";
  if (status === 201) return "Made it";
  if (status === 404) return "Not found";
  return "Something went wrong";
}

// ---------- Drill C: template literals ----------
// Backticks ` ` instead of quotes. Anything inside ${ } is worked out and dropped into the text.
// Example:
function welcome(truck) {
  return `Welcome to ${truck}!`;
}
console.log("Example:", welcome("Taco Rocket")); // "Welcome to Taco Rocket!"

// Rep 1: write a function called priceTag(item) with a template literal.
//   priceTag({ name: "Taco", price: 4.5 })  →  "Taco: $4.5"
//   (Careful: the $ before the price is just a dollar sign. ${ } is the special part: "$${item.price}")

function priceTag(item) {
  return `${item.name}: $${item.price}`;
}

// Rep 2: write a function called recipeCard(recipe). Math works inside ${ } too!
//   recipeCard(sampleRecipe)  →  "Classic Margherita Pizza · Italian · 35 min"
//   (35 = prepTimeMinutes + cookTimeMinutes. Copy the · from here.)

function recipeCard(recipe) {
  return `${recipe.name} · ${recipe.cuisine} · ${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min`;
}

// Rep 3: write a function called addedMessage(name, id).
//   addedMessage("Pho Rocket", 51)  →  'Added "Pho Rocket" as recipe #51'
//   (Backticks let you put "double quotes" inside without any trouble.)

function addedMessage(name, id) {
  return `Added "${name}" as recipe #${id}`;
}

// ---------- Drill D: build the request (nothing is sent yet) ----------
// Rep 1: write a function called recipeUrl(id) that returns the address for one recipe. Use a template literal.
//   recipeUrl(7)  →  "https://dummyjson.com/recipes/7"

function recipeUrl(id) {
  return `https://dummyjson.com/recipes/${id}`;
}

// Rep 2: write a function called postOptions(name) that returns the options for a POST:
//   method "POST", a Content-Type header of "application/json",
//   and a body with { name: name } turned into JSON text.
//   postOptions("Pho Rocket")  →
//     { method: "POST", headers: { "Content-Type": "application/json" }, body: '{"name":"Pho Rocket"}' }

function postOptions(name) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  };
}

// ---------- Drill E: fetch for real ----------
// The checker uses a pretend server, so these work even with no internet.
// Example: get one recipe and return its name.
async function getRecipeName(id) {
  const response = await fetch("https://dummyjson.com/recipes/" + id);
  const recipe = await response.json();
  return recipe.name;
}

// Rep 1: write async function getCuisine(id) that gets recipe number id and returns its cuisine.
//   await getCuisine(1)  →  "Italian"

async function getCuisine(id) {
  const response = await fetch("https://dummyjson.com/recipes/" + id);
  const recipe = await response.json();
  return recipe.cuisine;
}

// Rep 2: write async function safeCuisine(id). Same as Rep 1, but:
//   if the answer is not ok (like 9999)  →  return "Not found"
//   if there's no answer at all (no internet)  →  return "Offline"   (try / catch)

async function safeCuisine(id) {
  try {
    const response = await fetch("https://dummyjson.com/recipes/" + id);

    if (!response.ok) {
      return "Not found";
    }

    const recipe = await response.json();
    return recipe.cuisine;
  } catch (error) {
    return "Offline";
  }
}

// Rep 3: write async function sendDish(name). POST it to https://dummyjson.com/recipes/add
// (your postOptions from Drill D and addedMessage from Drill C can help!).
// Return a message with the name and id that come back:
//   await sendDish("Pho Rocket")  →  'Added "Pho Rocket" as recipe #51'

async function sendDish(name) {
  const response = await fetch(
    "https://dummyjson.com/recipes/add",
    postOptions(name),
  );

  const newDish = await response.json();

  return addedMessage(newDish.name, newDish.id);
}

// (Leave this last line alone. It tells the checker your file ran.)
const scriptLoaded = true;
