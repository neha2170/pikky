// controllers/foodController.js
const fetchFoodList = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          foodList: [
            { name: 'Pav Bhaji', description: 'A spicy blend of vegetables', price: 120 },
            { name: 'Vada Pav', description: 'Indian-style burger', price: 50 },
          ],
        });
      }, 115);
    });
  };
  
  const fetchFoodLocations = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          locations: ['Panaji', 'Margao', 'Vasco da Gama'],
        });
      }, 2 * 60 * 1000); // 2 minutes
    });
  };
  
  const fetchFoodNutrition = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          nutrition: [
            { name: 'Pav Bhaji', calories: 400, protein: 10 },
            { name: 'Vada Pav', calories: 300, protein: 5 },
          ],
        });
      }, 300);
    });
  };
  
  const fetchStockOutFoods = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          stockOut: ['Samosa'],
        });
      }, 100);
    });
  };
  
  const getFoodData = async (req, res) => {
    try {
      const [foodList, locations, nutrition, stockOut] = await Promise.all([
        fetchFoodList(),
        fetchFoodLocations(),
        fetchFoodNutrition(),
        fetchStockOutFoods(),
      ]);
  console.log("foodList",foodList,locations,nutrition,stockOut,"stockOut")
      const data = {
        ...foodList,
        ...locations,
        ...nutrition,
        ...stockOut,
      };
  
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch food data' });
    }
  };
  
  module.exports = { getFoodData };
  