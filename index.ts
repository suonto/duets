/**
 * Receive a prefix P and an existing type T.
 *
 * Create a new type that has all properties of T but
 * with all property names prefixed with P
 */
export type Prefixed<T, P extends string> = {
  [K in keyof T as K extends string ? `${P}${K}` : never]: T[K];
};

/**
 * Personal food texture preferences that apply to any food.
 * A person either prefers their food in the given texture or they don't.
 */
const foodTexturePreferences = {
  stick: true,
  ball: true,
  soup: false,
};

type FishFoodTexturePreferences = Prefixed<
  typeof foodTexturePreferences,
  "fish_"
>;
type FoodTexturePreferencesKey = keyof typeof foodTexturePreferences;
type Preference<T, K extends keyof T> = T[K];
type K = keyof FishFoodTexturePreferences;

/**
 * Food texture preferences that are specific to fish being the main ingredient.
 */
const fishFoodTexturePreferences: FishFoodTexturePreferences = (
  Object.entries(foodTexturePreferences) as [
    FoodTexturePreferencesKey,
    (typeof foodTexturePreferences)[FoodTexturePreferencesKey]
  ][]
).reduce((result, [key, value]) => {
  result[`fish_${key}`] = value;
  return result;
}, {} as Record<K, Preference<FishFoodTexturePreferences, K>>);

/**
 * Editor autocompletes prefixed property names.
 * Nontrivial behaviour to achieve.
 */
console.log(fishFoodTexturePreferences.fish_stick);
console.log(fishFoodTexturePreferences.fish_ball);
console.log(fishFoodTexturePreferences.fish_soup);

/**
 * This is an array with 1-3 strings in it.
 * Or artificially, a tuple type with optional elements.
 * (in reality tuples are arrays with fixed elements).
 *
 * Examples:
 * const myArray: OneToThreeStrings = []; -> "Source has 0 element(s) but target requires 1"
 * const myArray: OneToThreeStrings = ["foo", "foo", "foo", "foo"]; -> "Source has 4 element(s) but target allows only 3"
 */
type OneToThreeStrings = [string, string?, string?];

const myArr: OneToThreeStrings = ["foo"];
/**
 * Using pop on a tuple is mutilation and completely wrong.
 * Typescript would surely like to forbid that (compile error),
 * but can't since it can't distinguish tuples from arrays as
 * they are in-fact arrays.
 * :clown_face:
 */
myArr.pop();
// runtime error accessing first from OneToThreeStrings
myArr[0];

/**
 * This example messes up with the compiler.
 * Empty array destructuring results in array element type,
 * when in reality the value is undefined.
 * Destructuring arrays and objects in general is not type-safe.
 * Destructuring (unmutilated) tuples is type-safe (for example the first element of OneToThreeStrings).
 */
const array = ["foo"];
array.pop();

// The type of foo here is string. In reality foo is undefined.
const [foo] = array;

console.log(foo);
