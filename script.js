// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const userForm = document.getElementById('user-input-form');
const exerciseSearch = document.getElementById('exercise-search');
const exerciseContainer = document.getElementById('exercise-container');
const muscleFilter = document.getElementById('muscle-filter');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const ingredientSearch = document.getElementById('ingredient-search');
const ingredientContainer = document.getElementById('ingredient-container');
const generatePlanBtn = document.getElementById('generate-plan');
const savePlanBtn = document.getElementById('save-plan');
const weekTabs = document.getElementById('week-tabs');
const workoutPlansContainer = document.getElementById('workout-plans-container');
const foodSearch = document.getElementById('food-search');
const foodSearchResults = document.getElementById('food-search-results');
const foodList = document.getElementById('food-list');
const addFoodBtn = document.getElementById('add-food');
const mealBtns = document.querySelectorAll('.meal-btn');
const detailedNutritionTable = document.getElementById('detailed-nutrition-table');
const macroChartCtx = document.getElementById('macro-chart');

// Global Variables
let userData = {};
let currentMealType = 'breakfast';
let selectedFoods = [];
let macroChart = null;

// Sample Data
const exercises = [
    {
        name: "Bench Press",
        description: "Lie on a bench and press the barbell up from your chest.",
        muscleGroup: "chest",
        image: "https://via.placeholder.com/300x200?text=Bench+Press"
    },
    {
        name: "Squat",
        description: "Lower your body by bending your knees and hips, then stand back up.",
        muscleGroup: "legs",
        image: "https://via.placeholder.com/300x200?text=Squat"
    },
    {
        name: "Deadlift",
        description: "Lift the barbell from the ground to hip level, keeping your back straight.",
        muscleGroup: "back",
        image: "https://via.placeholder.com/300x200?text=Deadlift"
    },
    {
        name: "Shoulder Press",
        description: "Press the dumbbells or barbell overhead from shoulder height.",
        muscleGroup: "shoulders",
        image: "https://via.placeholder.com/300x200?text=Shoulder+Press"
    },
    {
        name: "Bicep Curl",
        description: "Curl the dumbbells or barbell up towards your shoulders.",
        muscleGroup: "arms",
        image: "https://via.placeholder.com/300x200?text=Bicep+Curl"
    },
    {
        name: "Tricep Dip",
        description: "Lower your body between parallel bars by bending your elbows.",
        muscleGroup: "arms",
        image: "https://via.placeholder.com/300x200?text=Tricep+Dip"
    },
    {
        name: "Pull-up",
        description: "Pull your body up until your chin is above the bar.",
        muscleGroup: "back",
        image: "https://via.placeholder.com/300x200?text=Pull-up"
    },
    {
        name: "Lunge",
        description: "Step forward and lower your body until both knees are bent at 90 degrees.",
        muscleGroup: "legs",
        image: "https://via.placeholder.com/300x200?text=Lunge"
    },
    {
        name: "Plank",
        description: "Hold your body in a straight line supported by your forearms and toes.",
        muscleGroup: "core",
        image: "https://via.placeholder.com/300x200?text=Plank"
    },
    {
        name: "Russian Twist",
        description: "Sit on the floor and twist your torso side to side while holding a weight.",
        muscleGroup: "core",
        image: "https://via.placeholder.com/300x200?text=Russian+Twist"
    }
];

const indianIngredients = [
    {
        name: "Rice (white, cooked)",
        calories: 130,
        protein: 2.7,
        carbs: 28,
        fats: 0.3,
        fiber: 0.4
    },
    {
        name: "Chapati (whole wheat)",
        calories: 104,
        protein: 3.4,
        carbs: 20,
        fats: 0.4,
        fiber: 1.6
    },
    {
        name: "Dal (cooked lentils)",
        calories: 116,
        protein: 9,
        carbs: 20,
        fats: 0.4,
        fiber: 8
    },
    {
        name: "Paneer",
        calories: 265,
        protein: 18,
        carbs: 1.2,
        fats: 21,
        fiber: 0
    },
    {
        name: "Chicken Breast",
        calories: 165,
        protein: 31,
        carbs: 0,
        fats: 3.6,
        fiber: 0
    },
    {
        name: "Potato (boiled)",
        calories: 86,
        protein: 1.7,
        carbs: 20,
        fats: 0.1,
        fiber: 1.8
    },
    {
        name: "Ghee",
        calories: 900,
        protein: 0,
        carbs: 0,
        fats: 100,
        fiber: 0
    },
    {
        name: "Yogurt (plain)",
        calories: 59,
        protein: 3.4,
        carbs: 4.7,
        fats: 3.3,
        fiber: 0
    },
    {
        name: "Spinach (cooked)",
        calories: 23,
        protein: 2.9,
        carbs: 3.6,
        fats: 0.4,
        fiber: 2.4
    },
    {
        name: "Banana",
        calories: 89,
        protein: 1.1,
        carbs: 22.8,
        fats: 0.3,
        fiber: 2.6
    }
];

const foodDatabase = [
    {
        name: "Eggs",
        category: "Meat",
        calories: 173,
        protein: 42.4,
        carbs: 83.7,
        fats: 1.5,
        fiber: 1.5,
        sugars: 12.7,
        sodium: 752,
        cholesterol: 125
    },
    {
        name: "Apple",
        category: "Fruits",
        calories: 66,
        protein: 39.2,
        carbs: 13.8,
        fats: 3.2,
        fiber: 2.6,
        sugars: 12.2,
        sodium: 680,
        cholesterol: 97
    },
    {
        name: "Chicken Breast",
        category: "Meat",
        calories: 226,
        protein: 27.1,
        carbs: 79.1,
        fats: 25.8,
        fiber: 3.2,
        sugars: 44.7,
        sodium: 295,
        cholesterol: 157
    },
    {
        name: "Banana",
        category: "Fruits",
        calories: 116,
        protein: 43.4,
        carbs: 47.1,
        fats: 16.1,
        fiber: 6.5,
        sugars: 44.1,
        sodium: 307,
        cholesterol: 13
    },
    {
        name: "Oats",
        category: "Grains",
        calories: 387,
        protein: 31.2,
        carbs: 6.8,
        fats: 39.5,
        fiber: 5.1,
        sugars: 0.7,
        sodium: 300,
        cholesterol: 244
    },
    {
        name: "Carrot",
        category: "Vegetables",
        calories: 138,
        protein: 28.2,
        carbs: 12.4,
        fats: 20.2,
        fiber: 2.8,
        sugars: 37.8,
        sodium: 933,
        cholesterol: 15
    },
    {
        name: "Cookies",
        category: "Snacks",
        calories: 69,
        protein: 36.8,
        carbs: 17.8,
        fats: 15,
        fiber: 9.6,
        sugars: 36.4,
        sodium: 185,
        cholesterol: 228
    },
    {
        name: "Quinoa",
        category: "Grains",
        calories: 204,
        protein: 19.3,
        carbs: 62.7,
        fats: 31.8,
        fiber: 6.8,
        sugars: 40.3,
        sodium: 887,
        cholesterol: 135
    }
];

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load exercises
    displayExercises(exercises);
    
    // Load Indian ingredients
    displayIngredients(indianIngredients);
    
    // Set up event listeners for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            showSection(sectionId);
            
            // Close mobile menu if open
            nav.classList.remove('active');
            burger.classList.remove('active');
        });
    });
    
    // Burger menu toggle
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });
    
    // User form submission
    if (userForm) {
        userForm.addEventListener('submit', handleUserFormSubmit);
    }
    
    // Exercise search and filter
    if (exerciseSearch) {
        exerciseSearch.addEventListener('input', filterExercises);
    }
    
    if (muscleFilter) {
        muscleFilter.addEventListener('change', filterExercises);
    }
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Ingredient search
    if (ingredientSearch) {
        ingredientSearch.addEventListener('input', filterIngredients);
    }
    
    // Workout planner controls
    if (generatePlanBtn) {
        generatePlanBtn.addEventListener('click', generateWorkoutPlan);
    }
    
    if (savePlanBtn) {
        savePlanBtn.addEventListener('click', saveWorkoutPlan);
    }
    
    // Food tracker
    if (foodSearch) {
        foodSearch.addEventListener('input', searchFoodItems);
    }
    
    if (addFoodBtn) {
        addFoodBtn.addEventListener('click', addSelectedFood);
    }
    
    // Meal type selection
    mealBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentMealType = btn.getAttribute('data-meal');
            mealBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});

// Functions
function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
        
        // Special handling for certain sections
        if (sectionId === 'personalized-plan' && userData.age) {
            displayPersonalizedPlan();
        }
    }
}

function handleUserFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const dob = new Date(document.getElementById('dob').value);
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const bodyType = document.querySelector('input[name="body-type"]:checked').value;
    const goal = document.getElementById('goal').value;
    const activityLevel = document.getElementById('activity-level').value;
    
    // Calculate age
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    
    // Store user data
    userData = {
        dob,
        age,
        height,
        weight,
        bodyType,
        goal,
        activityLevel
    };
    
    // Save to localStorage
    localStorage.setItem('fitTrackUserData', JSON.stringify(userData));
    
    // Show personalized plan
    showSection('personalized-plan');
}

function displayPersonalizedPlan() {
    // Display user stats
    document.getElementById('user-age').textContent = userData.age;
    document.getElementById('user-height').textContent = `${userData.height} cm`;
    document.getElementById('user-weight').textContent = `${userData.weight} kg`;
    document.getElementById('user-body-type').textContent = capitalizeFirstLetter(userData.bodyType);
    document.getElementById('user-goal').textContent = formatGoal(userData.goal);
    document.getElementById('user-activity').textContent = formatActivityLevel(userData.activityLevel);
    
    // Calculate and display calorie needs
    const bmr = calculateBMR(userData);
    const tdee = calculateTDEE(bmr, userData.activityLevel);
    const calorieNeeds = adjustCaloriesForGoal(tdee, userData.goal);
    
    document.getElementById('daily-calories').textContent = Math.round(calorieNeeds);
    document.getElementById('display-calories').textContent = `${Math.round(calorieNeeds)} kcal`;
    
    // Calculate and display macronutrient split
    const macros = calculateMacros(calorieNeeds, userData.goal, userData.weight);
    
    const macroList = document.getElementById('macro-split');
    macroList.innerHTML = `
        <li>Protein: ${macros.protein}g (${Math.round(macros.proteinPercent)}%)</li>
        <li>Carbs: ${macros.carbs}g (${Math.round(macros.carbsPercent)}%)</li>
        <li>Fats: ${macros.fats}g (${Math.round(macros.fatsPercent)}%)</li>
    `;
    
    document.getElementById('display-protein').textContent = `${macros.protein}g`;
    document.getElementById('display-carbs').textContent = `${macros.carbs}g`;
    document.getElementById('display-fats').textContent = `${macros.fats}g`;
    
    // Generate workout recommendations
    const workoutList = document.getElementById('workout-plan-list');
    workoutList.innerHTML = generateWorkoutRecommendations(userData.goal, userData.bodyType);
    
    // Generate general advice
    document.getElementById('advice-text').textContent = generateGeneralAdvice(userData.goal, userData.bodyType);
    
    // Update chart if it exists
    if (macroChart) {
        updateMacroChart(macros);
    } else {
        createMacroChart(macros);
    }
}

function calculateBMR(user) {
    // Mifflin-St Jeor Equation
    if (user.age && user.height && user.weight) {
        return (10 * user.weight) + (6.25 * user.height) - (5 * user.age) + 5;
    }
    return 0;
}

function calculateTDEE(bmr, activityLevel) {
    const multipliers = {
        'sedentary': 1.2,
        'lightly-active': 1.375,
        'moderately-active': 1.55,
        'very-active': 1.725,
        'extremely-active': 1.9
    };
    return bmr * (multipliers[activityLevel] || 1.2);
}

function adjustCaloriesForGoal(tdee, goal) {
    const adjustments = {
        'weight-loss': 0.85,
        'muscle-gain': 1.15,
        'maintenance': 1,
        'fitness': 1.05
    };
    return tdee * (adjustments[goal] || 1);
}

function calculateMacros(calories, goal, weight) {
    let protein, carbs, fats;
    
    // Protein calculation (1.6-2.2g per kg of body weight)
    if (goal === 'muscle-gain') {
        protein = weight * 2.2;
    } else if (goal === 'weight-loss') {
        protein = weight * 2.0;
    } else {
        protein = weight * 1.6;
    }
    
    const proteinCalories = protein * 4;
    
    // Fat calculation (20-35% of calories)
    let fatPercent;
    if (goal === 'weight-loss') {
        fatPercent = 0.25;
    } else if (goal === 'muscle-gain') {
        fatPercent = 0.20;
    } else {
        fatPercent = 0.25;
    }
    
    const fatCalories = calories * fatPercent;
    fats = fatCalories / 9;
    
    // Remaining calories go to carbs
    const carbCalories = calories - proteinCalories - fatCalories;
    carbs = carbCalories / 4;
    
    return {
        protein: Math.round(protein),
        carbs: Math.round(carbs),
        fats: Math.round(fats),
        proteinPercent: (proteinCalories / calories) * 100,
        carbsPercent: (carbCalories / calories) * 100,
        fatsPercent: (fatCalories / calories) * 100
    };
}

function generateWorkoutRecommendations(goal, bodyType) {
    let recommendations = [];
    
    if (goal === 'muscle-gain') {
        recommendations.push("Strength training 4-5 times per week with progressive overload");
        recommendations.push("Focus on compound movements (squats, deadlifts, bench press)");
        recommendations.push("3-4 sets of 6-12 reps per exercise");
        
        if (bodyType === 'ectomorph') {
            recommendations.push("Limit cardio to 1-2 sessions per week to conserve calories");
            recommendations.push("Consider shorter, more intense workouts (45-60 minutes)");
        } else if (bodyType === 'endomorph') {
            recommendations.push("Include some metabolic conditioning or HIIT 1-2 times per week");
        }
    } else if (goal === 'weight-loss') {
        recommendations.push("Combination of strength training and cardio 4-5 times per week");
        recommendations.push("Circuit training or HIIT 2-3 times per week");
        recommendations.push("2-3 sets of 12-15 reps with shorter rest periods");
        
        if (bodyType === 'endomorph') {
            recommendations.push("Include more frequent cardio sessions (3-4 times per week)");
        }
    } else if (goal === 'fitness') {
        recommendations.push("Balanced program with strength, cardio, and flexibility training");
        recommendations.push("3-4 strength sessions and 2-3 cardio sessions per week");
        recommendations.push("Variety of rep ranges (8-15) for strength and endurance");
    } else { // maintenance
        recommendations.push("3-4 balanced workouts per week to maintain current fitness");
        recommendations.push("Mix of strength, cardio, and flexibility exercises");
        recommendations.push("Focus on consistency and enjoyment of activities");
    }
    
    return recommendations.map(rec => `<li>${rec}</li>`).join('');
}

function generateGeneralAdvice(goal, bodyType) {
    let advice = "";
    
    if (goal === 'muscle-gain') {
        advice = "Focus on progressive overload in your workouts and ensure you're consuming enough calories and protein to support muscle growth. ";
    } else if (goal === 'weight-loss') {
        advice = "Create a sustainable calorie deficit through diet and exercise. Focus on whole, nutrient-dense foods and consistent activity. ";
    } else if (goal === 'fitness') {
        advice = "Aim for a balanced approach that improves all aspects of fitness - strength, endurance, and flexibility. ";
    } else {
        advice = "Maintain your current routine with a focus on consistency and enjoyment. ";
    }
    
    if (bodyType === 'ectomorph') {
        advice += "As an ectomorph, you may need to eat more calories than you think to see gains, and focus on strength training.";
    } else if (bodyType === 'mesomorph') {
        advice += "As a mesomorph, you respond well to most types of training and can see results relatively quickly.";
    } else if (bodyType === 'endomorph') {
        advice += "As an endomorph, you may need to pay closer attention to nutrition and include regular cardio for optimal results.";
    }
    
    return advice;
}

function displayExercises(exercisesToShow) {
    if (!exerciseContainer) return;
    
    exerciseContainer.innerHTML = exercisesToShow.map(exercise => `
        <div class="exercise-card" data-muscle="${exercise.muscleGroup}">
            <div class="exercise-image">
                <img src="${exercise.image}" alt="${exercise.name}">
            </div>
            <div class="exercise-info">
                <h3>${exercise.name}</h3>
                <p>${exercise.description}</p>
                <span class="muscle-tag">${capitalizeFirstLetter(exercise.muscleGroup)}</span>
            </div>
        </div>
    `).join('');
}

function filterExercises() {
    const searchTerm = exerciseSearch.value.toLowerCase();
    const muscleGroup = muscleFilter.value;
    
    const filtered = exercises.filter(exercise => {
        const matchesSearch = exercise.name.toLowerCase().includes(searchTerm) || 
                             exercise.description.toLowerCase().includes(searchTerm);
        const matchesMuscle = muscleGroup === 'all' || exercise.muscleGroup === muscleGroup;
        return matchesSearch && matchesMuscle;
    });
    
    displayExercises(filtered);
}

function switchTab(tabId) {
    // Update active tab button
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active');
        }
    });
    
    // Update active tab content
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
            content.classList.add('active');
        }
    });
}

function displayIngredients(ingredientsToShow) {
    if (!ingredientContainer) return;
    
    ingredientContainer.innerHTML = ingredientsToShow.map(ingredient => `
        <div class="ingredient-card">
            <h3>${ingredient.name}</h3>
            <p>Calories: ${ingredient.calories} kcal</p>
            <p>Protein: ${ingredient.protein}g | Carbs: ${ingredient.carbs}g | Fats: ${ingredient.fats}g</p>
            ${ingredient.fiber ? `<p>Fiber: ${ingredient.fiber}g</p>` : ''}
        </div>
    `).join('');
}

function filterIngredients() {
    const searchTerm = ingredientSearch.value.toLowerCase();
    
    const filtered = indianIngredients.filter(ingredient => {
        return ingredient.name.toLowerCase().includes(searchTerm);
    });
    
    displayIngredients(filtered);
}

function generateWorkoutPlan() {
    if (!userData.goal) {
        alert('Please complete your profile first');
        showSection('home');
        return;
    }
    
    // Clear existing tabs and plans
    weekTabs.innerHTML = '';
    workoutPlansContainer.innerHTML = '';
    
    // Determine number of weeks based on goal
    const weeks = userData.goal === 'muscle-gain' ? 8 : 
                 userData.goal === 'weight-loss' ? 6 : 4;
    
    // Create week tabs
    for (let i = 1; i <= weeks; i++) {
        const weekTab = document.createElement('button');
        weekTab.className = `week-tab ${i === 1 ? 'active' : ''}`;
        weekTab.textContent = `Week ${i}`;
        weekTab.addEventListener('click', () => showWorkoutWeek(i));
        weekTabs.appendChild(weekTab);
    }
    
    // Generate workout plans for each week
    for (let i = 1; i <= weeks; i++) {
        const weekPlan = document.createElement('div');
        weekPlan.className = `workout-plan ${i === 1 ? 'active' : ''}`;
        weekPlan.id = `week-${i}-plan`;
        
        // Generate workout days based on goal and week
        const workoutDays = generateWorkoutDays(i, weeks);
        weekPlan.innerHTML = workoutDays.map(day => `
            <div class="workout-day">
                <h3>${day.day}</h3>
                <p>Focus: ${day.focus}</p>
                <div class="exercises">
                    ${day.exercises.map(ex => `
                        <div class="exercise-item">
                            <span>${ex.name}</span>
                            <span>${ex.sets}x${ex.reps}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
        
        workoutPlansContainer.appendChild(weekPlan);
    }
}

function showWorkoutWeek(weekNumber) {
    // Update active tab
    document.querySelectorAll('.week-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.textContent === `Week ${weekNumber}`) {
            tab.classList.add('active');
        }
    });
    
    // Show corresponding plan
    document.querySelectorAll('.workout-plan').forEach(plan => {
        plan.classList.remove('active');
        if (plan.id === `week-${weekNumber}-plan`) {
            plan.classList.add('active');
        }
    });
}

function generateWorkoutDays(week, totalWeeks) {
    let days = [];
    let focusAreas = [];
    
    if (userData.goal === 'muscle-gain') {
        focusAreas = ['Push (Chest/Shoulders/Triceps)', 'Pull (Back/Biceps)', 'Legs', 'Push', 'Pull', 'Legs'];
    } else if (userData.goal === 'weight-loss') {
        focusAreas = ['Full Body', 'Cardio + Core', 'Full Body', 'Cardio + Core', 'Full Body'];
    } else { // fitness or maintenance
        focusAreas = ['Upper Body', 'Lower Body', 'Cardio', 'Total Body'];
    }
    
    // Adjust intensity based on week
    const intensity = week / totalWeeks;
    let sets, reps;
    
    if (userData.goal === 'muscle-gain') {
        sets = intensity < 0.5 ? 3 : 4;
        reps = intensity < 0.5 ? '8-10' : '6-8';
    } else if (userData.goal === 'weight-loss') {
        sets = 3;
        reps = intensity < 0.5 ? '12-15' : '15-20';
    } else {
        sets = 3;
        reps = '10-12';
    }
    
    // Generate days
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    for (let i = 0; i < focusAreas.length; i++) {
        const focus = focusAreas[i];
        const dayName = i < daysOfWeek.length ? daysOfWeek[i] : 'Day ' + (i + 1);
        
        let exercisesForDay = [];
        
        if (focus.includes('Push')) {
            exercisesForDay = [
                { name: 'Bench Press', sets, reps },
                { name: 'Shoulder Press', sets, reps },
                { name: 'Tricep Dips', sets, reps },
                { name: 'Push-ups', sets, reps: reps === '6-8' ? '8-10' : reps }
            ];
        } else if (focus.includes('Pull')) {
            exercisesForDay = [
                { name: 'Pull-ups', sets, reps: reps === '6-8' ? '6-10' : reps },
                { name: 'Bent-over Rows', sets, reps },
                { name: 'Lat Pulldown', sets, reps },
                { name: 'Bicep Curls', sets, reps }
            ];
        } else if (focus.includes('Legs')) {
            exercisesForDay = [
                { name: 'Squats', sets, reps },
                { name: 'Deadlifts', sets, reps: reps === '6-8' ? '5-8' : reps },
                { name: 'Lunges', sets, reps },
                { name: 'Calf Raises', sets, reps: '15-20' }
            ];
        } else if (focus.includes('Full Body')) {
            exercisesForDay = [
                { name: 'Squats', sets, reps },
                { name: 'Push-ups', sets, reps },
                { name: 'Bent-over Rows', sets, reps },
                { name: 'Plank', sets: 3, reps: '30-60 sec' }
            ];
        } else if (focus.includes('Cardio')) {
            exercisesForDay = [
                { name: 'HIIT Circuit', sets: 1, reps: '20 min' },
                { name: 'Russian Twists', sets: 3, reps: '15-20' },
                { name: 'Plank', sets: 3, reps: '30-60 sec' }
            ];
        } else if (focus.includes('Upper Body')) {
            exercisesForDay = [
                { name: 'Bench Press', sets, reps },
                { name: 'Pull-ups', sets, reps: '6-10' },
                { name: 'Shoulder Press', sets, reps },
                { name: 'Bicep Curls', sets, reps }
            ];
        } else if (focus.includes('Lower Body')) {
            exercisesForDay = [
                { name: 'Squats', sets, reps },
                { name: 'Deadlifts', sets, reps: '5-8' },
                { name: 'Lunges', sets, reps },
                { name: 'Calf Raises', sets, reps: '15-20' }
            ];
        } else if (focus.includes('Total Body')) {
            exercisesForDay = [
                { name: 'Squats', sets, reps },
                { name: 'Push-ups', sets, reps },
                { name: 'Bent-over Rows', sets, reps },
                { name: 'Plank', sets: 3, reps: '30-60 sec' }
            ];
        }

        days.push({
            day: dayName,
            focus,
            exercises: exercisesForDay
        });
    }

    return days;
}

function saveWorkoutPlan() {
    alert('Workout plan saved! (In a real app, this would save to your profile)');
}

function searchFoodItems() {
    const searchTerm = foodSearch.value.toLowerCase();
    
    if (searchTerm.length < 2) {
        foodSearchResults.innerHTML = '';
        return;
    }
    
    const filtered = foodDatabase.filter(food => {
        return food.name.toLowerCase().includes(searchTerm) || 
               food.category.toLowerCase().includes(searchTerm);
    });
    
    displayFoodSearchResults(filtered);
}

function displayFoodSearchResults(foods) {
    foodSearchResults.innerHTML = foods.map(food => `
        <div class="food-result-item" data-food='${JSON.stringify(food)}'>
            <strong>${food.name}</strong> (${food.category})
            <div class="food-macros">
                ${food.calories} kcal | P: ${food.protein}g | C: ${food.carbs}g | F: ${food.fats}g
            </div>
        </div>
    `).join('');
    
    // Add click event to search results
    document.querySelectorAll('.food-result-item').forEach(item => {
        item.addEventListener('click', () => {
            const foodData = JSON.parse(item.getAttribute('data-food'));
            selectFoodItem(foodData);
        });
    });
}

function selectFoodItem(food) {
    // Set the selected food in the search box
    foodSearch.value = food.name;
    foodSearchResults.innerHTML = '';
    
    // Store the selected food in a data attribute
    addFoodBtn.setAttribute('data-food', JSON.stringify(food));
}

function addSelectedFood() {
    const foodData = addFoodBtn.getAttribute('data-food');
    const quantity = parseFloat(document.getElementById('food-quantity').value) || 100;
    
    if (!foodData) {
        alert('Please search and select a food item first');
        return;
    }
    
    const food = JSON.parse(foodData);
    const scaledFood = scaleFoodNutrition(food, quantity);
    scaledFood.mealType = currentMealType;
    scaledFood.quantity = quantity;
    
    // Add to selected foods
    selectedFoods.push(scaledFood);
    
    // Update UI
    updateFoodList();
    updateNutritionSummary();
    
    // Clear selection
    addFoodBtn.removeAttribute('data-food');
    foodSearch.value = '';
}

function scaleFoodNutrition(food, quantity) {
    const scale = quantity / 100; // Assuming nutrition data is per 100g
    return {
        name: food.name,
        category: food.category,
        calories: Math.round(food.calories * scale),
        protein: Math.round(food.protein * scale * 10) / 10,
        carbs: Math.round(food.carbs * scale * 10) / 10,
        fats: Math.round(food.fats * scale * 10) / 10,
        fiber: food.fiber ? Math.round(food.fiber * scale * 10) / 10 : 0,
        sugars: food.sugars ? Math.round(food.sugars * scale * 10) / 10 : 0,
        sodium: food.sodium ? Math.round(food.sodium * scale) : 0,
        cholesterol: food.cholesterol ? Math.round(food.cholesterol * scale) : 0
    };
}

function updateFoodList() {
    // Filter foods by current meal type
    const currentMealFoods = selectedFoods.filter(food => food.mealType === currentMealType);
    
    foodList.innerHTML = currentMealFoods.map((food, index) => `
        <div class="food-list-item" data-index="${index}">
            <span>${food.name} (${food.quantity}g)</span>
            <span class="remove-food" onclick="removeFoodItem(${index})"><i class="fas fa-times"></i></span>
        </div>
    `).join('');
}

function removeFoodItem(index) {
    selectedFoods.splice(index, 1);
    updateFoodList();
    updateNutritionSummary();
}

function updateNutritionSummary() {
    const totals = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        fiber: 0,
        sugars: 0,
        sodium: 0,
        cholesterol: 0
    };
    
    selectedFoods.forEach(food => {
        totals.calories += food.calories;
        totals.protein += food.protein;
        totals.carbs += food.carbs;
        totals.fats += food.fats;
        totals.fiber += food.fiber || 0;
        totals.sugars += food.sugars || 0;
        totals.sodium += food.sodium || 0;
        totals.cholesterol += food.cholesterol || 0;
    });
    
    // Update summary cards
    document.getElementById('total-calories').textContent = `${totals.calories} kcal`;
    document.getElementById('total-protein').textContent = `${Math.round(totals.protein * 10) / 10} g`;
    document.getElementById('total-carbs').textContent = `${Math.round(totals.carbs * 10) / 10} g`;
    document.getElementById('total-fats').textContent = `${Math.round(totals.fats * 10) / 10} g`;
    
    // Update detailed table
    detailedNutritionTable.innerHTML = selectedFoods.map((food, index) => `
        <tr>
            <td>${food.name} (${food.mealType})</td>
            <td>${food.calories}</td>
            <td>${food.protein}</td>
            <td>${food.carbs}</td>
            <td>${food.fats}</td>
            <td class="remove-item" onclick="removeFoodItem(${index})"><i class="fas fa-times"></i></td>
        </tr>
    `).join('');
    
    // Add total row
    detailedNutritionTable.innerHTML += `
        <tr class="total-row">
            <td><strong>Total</strong></td>
            <td><strong>${totals.calories}</strong></td>
            <td><strong>${Math.round(totals.protein * 10) / 10}</strong></td>
            <td><strong>${Math.round(totals.carbs * 10) / 10}</strong></td>
            <td><strong>${Math.round(totals.fats * 10) / 10}</strong></td>
            <td></td>
        </tr>
    `;
    
    // Update chart
    updateMacroChartFromTotals(totals);
}

function createMacroChart(macros) {
    if (!macroChartCtx) return;
    
    macroChart = new Chart(macroChartCtx, {
        type: 'doughnut',
        data: {
            labels: ['Protein', 'Carbohydrates', 'Fats'],
            datasets: [{
                data: [macros.proteinPercent, macros.carbsPercent, macros.fatsPercent],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(255, 99, 132, 0.7)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw.toFixed(1)}%`;
                        }
                    }
                }
            }
        }
    });
}

function updateMacroChart(macros) {
    if (macroChart) {
        macroChart.data.datasets[0].data = [
            macros.proteinPercent, 
            macros.carbsPercent, 
            macros.fatsPercent
        ];
        macroChart.update();
    }
}

function updateMacroChartFromTotals(totals) {
    if (!macroChartCtx) return;
    
    const totalMacros = totals.protein + totals.carbs + totals.fats;
    const proteinPercent = (totals.protein * 4 / (totals.calories || 1)) * 100;
    const carbsPercent = (totals.carbs * 4 / (totals.calories || 1)) * 100;
    const fatsPercent = (totals.fats * 9 / (totals.calories || 1)) * 100;
    
    if (macroChart) {
        macroChart.data.datasets[0].data = [proteinPercent, carbsPercent, fatsPercent];
        macroChart.update();
    } else {
        createMacroChart({
            proteinPercent,
            carbsPercent,
            fatsPercent
        });
    }
}

// Helper functions
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatGoal(goal) {
    const goalNames = {
        'weight-loss': 'Weight Loss',
        'muscle-gain': 'Muscle Gain',
        'maintenance': 'Maintenance',
        'fitness': 'Improved Fitness'
    };
    return goalNames[goal] || goal;
}

function formatActivityLevel(activity) {
    const activityNames = {
        'sedentary': 'Sedentary',
        'lightly-active': 'Lightly Active',
        'moderately-active': 'Moderately Active',
        'very-active': 'Very Active',
        'extremely-active': 'Extremely Active'
    };
    return activityNames[activity] || activity;
}

// Check for saved user data on load
window.addEventListener('load', () => {
    const savedData = localStorage.getItem('fitTrackUserData');
    if (savedData) {
        userData = JSON.parse(savedData);
        showSection('personalized-plan');
    }
});