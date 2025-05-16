import streamlit as st
import pandas as pd
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns
from PIL import Image
import os

# Set page config
st.set_page_config(
    page_title="MyFitnessGuide",
    page_icon="💪",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Load nutrition data
@st.cache_data
def load_nutrition_data():
    try:
        return pd.read_csv("daily_food_nutrition_dataset.csv")
    except FileNotFoundError:
        st.error("Nutrition dataset not found at the specified path.")
        return pd.DataFrame()

nutrition_df = load_nutrition_data()

# Page navigation
def main():
    st.sidebar.title("Navigation")
    page = st.sidebar.radio("Go to", [
        "User Profile & Goal Setting",
        "Understanding Your Body",
        "Warm-ups & Exercises",
        "Personalized Nutrition Guide",
        "Workout Planner"
    ])

    if page == "User Profile & Goal Setting":
        user_profile_page()
    elif page == "Understanding Your Body":
        body_anatomy_page()
    elif page == "Warm-ups & Exercises":
        exercises_page()
    elif page == "Personalized Nutrition Guide":
        nutrition_page()
    elif page == "Workout Planner":
        workout_planner_page()

# Page 1: User Profile and Goal Setting
def user_profile_page():
    st.title("👤 User Profile & Goal Setting")
    
    with st.form("user_profile_form"):
        col1, col2 = st.columns(2)
        
        with col1:
            st.subheader("Personal Information")
            dob = st.date_input("Date of Birth", min_value=datetime(1900, 1, 1), max_value=datetime.today())
            
            # Calculate age
            today = datetime.today()
            age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
            st.info(f"Age: {age} years")
            
            height_unit = st.radio("Height Unit", ["cm", "inches"])
            height = st.number_input(f"Height ({height_unit})", min_value=100.0 if height_unit == "cm" else 40.0, 
                                   max_value=250.0 if height_unit == "cm" else 100.0, value=170.0)
            
            weight_unit = st.radio("Weight Unit", ["kg", "lbs"])
            weight = st.number_input(f"Weight ({weight_unit})", min_value=30.0, max_value=200.0, value=70.0)
            
        with col2:
            st.subheader("Fitness Information")
            
            # Body type explanation expander
            with st.expander("Body Type Explanations"):
                st.markdown("""
                - **Ectomorph**: Naturally lean with difficulty gaining weight/muscle
                - **Mesomorph**: Athletic build, gains muscle easily
                - **Endomorph**: Naturally higher body fat, gains weight easily
                """)
            
            body_type = st.selectbox("Body Type", ["Ectomorph", "Mesomorph", "Endomorph"])
            
            fitness_goal = st.selectbox("Fitness Goal", [
                "Weight Loss", 
                "Muscle Gain", 
                "General Fitness", 
                "Increased Endurance"
            ])
            
            weeks = st.number_input("Number of Weeks for Goal", min_value=1, max_value=52, value=12)
        
        submitted = st.form_submit_button("Generate Plan")
    
    if submitted:
        st.success("Profile saved successfully!")
        st.subheader("Your Personalized Fitness Overview")
        
        # Convert units for calculations
        if height_unit == "inches":
            height_cm = height * 2.54
        else:
            height_cm = height
            
        if weight_unit == "lbs":
            weight_kg = weight * 0.453592
        else:
            weight_kg = weight
        
        # Calculate BMI
        bmi = weight_kg / ((height_cm / 100) ** 2)
        
        # Display metrics
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("BMI", f"{bmi:.1f}")
        with col2:
            st.metric("Goal", fitness_goal)
        with col3:
            st.metric("Timeframe", f"{weeks} weeks")
        
        # Generate recommendations based on inputs
        st.subheader("Recommended Approach")
        
        if fitness_goal == "Weight Loss":
            st.markdown("""
            - **Cardio**: 4-5 days per week (30-45 min sessions)
            - **Strength Training**: 3 days per week (full body workouts)
            - **Nutrition**: Caloric deficit with balanced macros
            """)
        elif fitness_goal == "Muscle Gain":
            st.markdown("""
            - **Strength Training**: 4-5 days per week (split routine)
            - **Cardio**: 2-3 days per week (20-30 min sessions)
            - **Nutrition**: Caloric surplus with high protein
            """)
        elif fitness_goal == "General Fitness":
            st.markdown("""
            - **Strength Training**: 3 days per week
            - **Cardio**: 3 days per week
            - **Flexibility**: 2-3 days per week
            """)
        elif fitness_goal == "Increased Endurance":
            st.markdown("""
            - **Cardio**: 5-6 days per week (varying intensity)
            - **Strength Training**: 2 days per week (full body)
            - **Nutrition**: Balanced diet with adequate carbs
            """)
        
        # Store user data in session state
        st.session_state.user_data = {
            "age": age,
            "height": height_cm,
            "weight": weight_kg,
            "body_type": body_type,
            "fitness_goal": fitness_goal,
            "weeks": weeks,
            "bmi": bmi
        }

# Page 2: Understanding Your Body
def body_anatomy_page():
    st.title("🧠 Understanding Your Body")
    
    muscle_groups = {
        "Chest": {
            "image": "https://www.visiblebody.com/hubfs/learn/assets/web-image-library/muscle-premium/male-muscle-anatomy-pectoralis-major-labeled-muscle-premium.png",
            "description": "The pectoralis major is the large fan-shaped muscle that makes up the chest. It's responsible for movements like pushing and bringing your arms across your body.",
            "size": "Large muscle group",
            "functions": ["Arm adduction", "Arm flexion", "Arm rotation"]
        },
        "Back": {
            "image": "https://www.visiblebody.com/hubfs/learn/assets/web-image-library/muscle-premium/male-muscle-anatomy-latissimus-dorsi-labeled-muscle-premium.png",
            "description": "The latissimus dorsi is the large muscle of the back that gives the 'V' shape. It's crucial for pulling movements and posture.",
            "size": "Large muscle group",
            "functions": ["Arm extension", "Arm adduction", "Spinal extension"]
        },
        "Legs": {
            "image": "https://www.visiblebody.com/hubfs/learn/assets/web-image-library/muscle-premium/male-muscle-anatomy-quadriceps-labeled-muscle-premium.png",
            "description": "The quadriceps (front thigh) and hamstrings (back thigh) make up the major leg muscles. They're the largest muscle group in the body.",
            "size": "Largest muscle group",
            "functions": ["Knee extension", "Hip flexion", "Knee flexion"]
        },
        "Shoulders": {
            "image": "https://www.visiblebody.com/hubfs/learn/assets/web-image-library/muscle-premium/male-muscle-anatomy-deltoid-labeled-muscle-premium.png",
            "description": "The deltoids cover the shoulder joint and are responsible for arm abduction and rotation.",
            "size": "Medium muscle group",
            "functions": ["Arm abduction", "Arm flexion", "Arm rotation"]
        },
        "Arms": {
            "image": "https://www.visiblebody.com/hubfs/learn/assets/web-image-library/muscle-premium/male-muscle-anatomy-biceps-brachii-labeled-muscle-premium.png",
            "description": "The biceps (front) and triceps (back) make up the major arm muscles.",
            "size": "Small muscle group",
            "functions": ["Elbow flexion", "Elbow extension"]
        },
        "Core": {
            "image": "https://www.visiblebody.com/hubfs/learn/assets/web-image-library/muscle-premium/male-muscle-anatomy-rectus-abdominis-labeled-muscle-premium.png",
            "description": "The abdominal muscles and obliques make up the core, which stabilizes the body.",
            "size": "Medium muscle group",
            "functions": ["Spinal flexion", "Rotation", "Stabilization"]
        }
    }
    
    selected_muscle = st.selectbox("Select a Muscle Group", list(muscle_groups.keys()))
    
    muscle = muscle_groups[selected_muscle]
    
    col1, col2 = st.columns([1, 2])
    
    with col1:
        st.image(muscle["image"], caption=selected_muscle, use_column_width=True)
    
    with col2:
        st.subheader(selected_muscle)
        st.markdown(f"**Size:** {muscle['size']}")
        st.markdown(f"**Primary Functions:** {', '.join(muscle['functions'])}")
        st.markdown(muscle["description"])
        
        if selected_muscle == "Legs":
            st.warning("Leg muscles are often neglected but are crucial for overall strength and metabolism!")
        elif selected_muscle == "Core":
            st.info("A strong core improves posture and reduces risk of back injuries.")

# Page 3: Warm-ups and Targeted Exercises
def exercises_page():
    st.title("🔥 Warm-ups & Targeted Exercises")
    
    tab1, tab2 = st.tabs(["Warm-up Routines", "Targeted Exercises"])
    
    with tab1:
        st.subheader("Essential Warm-up Exercises")
        
        warmups = {
            "Arm Circles": {
                "description": "Stand with arms extended to sides. Make small circles forward for 30 sec, then backward.",
                "image": "https://www.verywellfit.com/thmb/1QmZ8Q6Q2Q6Q2Q6Q2Q6Q2Q6Q2Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/arm-circles-56a8f3b85f9b58b7d0f0b8a1.jpg",
                "benefits": "Loosens shoulder joints, increases blood flow to arms"
            },
            "Leg Swings": {
                "description": "Hold onto a support, swing one leg forward and back, then side to side. 10 reps per leg.",
                "image": "https://www.verywellfit.com/thmb/1QmZ8Q6Q2Q6Q2Q6Q2Q6Q2Q6Q2Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/leg-swings-56a8f3b85f9b58b7d0f0b8a1.jpg",
                "benefits": "Prepares hip joints and hamstrings for movement"
            },
            "Jumping Jacks": {
                "description": "Start with feet together, arms at sides. Jump feet apart while raising arms overhead. 30 sec.",
                "image": "https://www.verywellfit.com/thmb/1QmZ8Q6Q2Q6Q2Q6Q2Q6Q2Q6Q2Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/jumping-jacks-56a8f3b85f9b58b7d0f0b8a1.jpg",
                "benefits": "Elevates heart rate, warms up entire body"
            },
            "Torso Twists": {
                "description": "Stand with feet shoulder-width apart, rotate torso side to side. 10 reps per side.",
                "image": "https://www.verywellfit.com/thmb/1QmZ8Q6Q2Q6Q2Q6Q2Q6Q2Q6Q2Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/torso-twists-56a8f3b85f9b58b7d0f0b8a1.jpg",
                "benefits": "Loosens spine and core muscles"
            }
        }
        
        for name, exercise in warmups.items():
            with st.expander(name):
                col1, col2 = st.columns([1, 2])
                with col1:
                    st.image(exercise["image"], use_column_width=True)
                with col2:
                    st.markdown(exercise["description"])
                    st.markdown(f"**Benefits:** {exercise['benefits']}")
    
    with tab2:
        st.subheader("Targeted Exercises by Muscle Group")
        
        exercises_db = {
            "Chest": [
                {
                    "name": "Push-ups",
                    "steps": [
                        "Start in plank position with hands slightly wider than shoulders",
                        "Lower body until chest nearly touches floor",
                        "Push back up to starting position"
                    ],
                    "image": "https://www.verywellfit.com/thmb/1QmZ8Q6Q2Q6Q2Q6Q2Q6Q2Q6Q2Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/push-ups-56a8f3b85f9b58b7d0f0b8a1.jpg",
                    "muscles": "Pectorals, Triceps, Shoulders"
                },
                {
                    "name": "Bench Press",
                    "steps": [
                        "Lie on bench with barbell above chest",
                        "Lower bar to mid-chest",
                        "Press bar back up to starting position"
                    ],
                    "image": "https://www.verywellfit.com/thmb/1QmZ8Q6Q2Q6Q2Q6Q2Q6Q2Q6Q2Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/bench-press-56a8f3b85f9b58b7d0f0b8a1.jpg",
                    "muscles": "Pectorals, Triceps, Shoulders"
                }
            ],
            "Back": [
                {
                    "name": "Pull-ups",
                    "steps": [
                        "Grab bar with palms facing away",
                        "Hang with arms fully extended",
                        "Pull body up until chin clears bar"
                    ],
                    "image": "https://www.verywellfit.com/thmb/1QmZ8Q6Q2Q6Q2Q6Q2Q6Q2Q6Q2Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/pull-ups-56a8f3b85f9b58b7d0f0b8a1.jpg",
                    "muscles": "Latissimus Dorsi, Biceps"
                },
                {
                    "name": "Bent-over Rows",
                    "steps": [
                        "Bend knees slightly, hinge at hips",
                        "Hold barbell with arms extended",
                        "Pull bar to waist while squeezing shoulder blades"
                    ],
                    "image": "https://www.verywellfit.com/thmb/1QmZ8Q6Q2Q6Q2Q6Q2Q6Q2Q6Q2Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/bent-over-rows-56a8f3b85f9b58b7d0f0b8a1.jpg",
                    "muscles": "Latissimus Dorsi, Rhomboids, Biceps"
                }
            ],
            "Legs": [
                {
                    "name": "Squats",
                    "steps": [
                        "Stand with feet shoulder-width apart",
                        "Lower hips as if sitting in a chair",
                        "Keep chest up and knees behind toes",
                        "Return to standing position"
                    ],
                    "image": "https://www.verywellfit.com/thmb/1QmZ8Q6Q2Q6Q2Q6Q2Q6Q2Q6Q2Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/squats-56a8f3b85f9b58b7d0f0b8a1.jpg",
                    "muscles": "Quadriceps, Hamstrings, Glutes"
                },
                {
                    "name": "Lunges",
                    "steps": [
                        "Step forward with one leg",
                        "Lower hips until both knees are bent at 90 degrees",
                        "Push back to starting position",
                        "Alternate legs"
                    ],
                    "image": "https://www.verywellfit.com/thmb/1QmZ8Q6Q2Q6Q2Q6Q2Q6Q2Q6Q2Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/lunges-56a8f3b85f9b58b7d0f0b8a1.jpg",
                    "muscles": "Quadriceps, Hamstrings, Glutes"
                }
            ],
            "Shoulders": [
                {
                    "name": "Overhead Press",
                    "steps": [
                        "Hold dumbbells at shoulder height",
                        "Press weights overhead until arms are straight",
                        "Lower back to shoulders with control"
                    ],
                    "image": "https://www.verywellfit.com/thmb/1QmZ8Q6Q2Q6Q2Q6Q2Q6Q2Q6Q2Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/overhead-press-56a8f3b85f9b58b7d0f0b8a1.jpg",
                    "muscles": "Deltoids, Triceps"
                },
                {
                    "name": "Lateral Raises",
                    "steps": [
                        "Hold dumbbells at sides",
                        "Raise arms out to sides until parallel to floor",
                        "Lower back down with control"
                    ],
                    "image": "https://www.verywellfit.com/thmb/1QmZ8Q6Q2Q6Q2Q6Q2Q6Q2Q6Q2Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/lateral-raises-56a8f3b85f9b58b7d0f0b8a1.jpg",
                    "muscles": "Lateral Deltoids"
                }
            ],
            "Arms": [
                {
                    "name": "Bicep Curls",
                    "steps": [
                        "Hold dumbbells with arms extended",
                        "Curl weights toward shoulders",
                        "Squeeze biceps at top",
                        "Lower back down with control"
                    ],
                    "image": "https://www.verywellfit.com/thmb/1QmZ8Q6Q2Q6Q2Q6Q2Q6Q2Q6Q2Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/bicep-curls-56a8f3b85f9b58b7d0f0b8a1.jpg",
                    "muscles": "Biceps"
                },
                {
                    "name": "Tricep Dips",
                    "steps": [
                        "Use parallel bars or bench",
                        "Lower body by bending elbows",
                        "Push back up to starting position"
                    ],
                    "image": "https://www.verywellfit.com/thmb/1QmZ8Q6Q2Q6Q2Q6Q2Q6Q2Q6Q2Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tricep-dips-56a8f3b85f9b58b7d0f0b8a1.jpg",
                    "muscles": "Triceps"
                }
            ],
            "Core": [
                {
                    "name": "Plank",
                    "steps": [
                        "Support body on forearms and toes",
                        "Keep body straight from head to heels",
                        "Hold position for time"
                    ],
                    "image": "https://www.verywellfit.com/thmb/1QmZ8Q6Q2Q6Q2Q6Q2Q6Q2Q6Q2Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/plank-56a8f3b85f9b58b7d0f0b8a1.jpg",
                    "muscles": "Rectus Abdominis, Obliques"
                },
                {
                    "name": "Russian Twists",
                    "steps": [
                        "Sit with knees bent, lean back slightly",
                        "Hold weight with arms extended",
                        "Rotate torso side to side"
                    ],
                    "image": "https://www.verywellfit.com/thmb/1QmZ8Q6Q2Q6Q2Q6Q2Q6Q2Q6Q2Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/russian-twists-56a8f3b85f9b58b7d0f0b8a1.jpg",
                    "muscles": "Obliques, Rectus Abdominis"
                }
            ]
        }
        
        muscle_group = st.selectbox("Select Muscle Group", list(exercises_db.keys()))
        
        for exercise in exercises_db[muscle_group]:
            with st.expander(exercise["name"]):
                col1, col2 = st.columns([1, 2])
                with col1:
                    st.image(exercise["image"], use_column_width=True)
                with col2:
                    st.markdown("**Steps:**")
                    for i, step in enumerate(exercise["steps"], 1):
                        st.markdown(f"{i}. {step}")
                    st.markdown(f"**Primary Muscles:** {exercise['muscles']}")

# Page 4: Personalized Nutrition Guide
def nutrition_page():
    st.title("🍎 Personalized Nutrition Guide")
    
    if "user_data" not in st.session_state:
        st.warning("Please complete your User Profile first to get personalized recommendations.")
        return
    
    user_data = st.session_state.user_data
    
    st.subheader("Basic Nutritional Guidelines")
    
    # Calculate BMR (Mifflin-St Jeor Equation)
    if user_data["age"] < 18:
        st.warning("Nutrition calculations are optimized for adults (18+ years)")
        return
    
    if user_data["fitness_goal"] == "Weight Loss":
        calorie_factor = 0.8
        protein_ratio = 0.3
        carb_ratio = 0.4
        fat_ratio = 0.3
    elif user_data["fitness_goal"] == "Muscle Gain":
        calorie_factor = 1.2
        protein_ratio = 0.35
        carb_ratio = 0.45
        fat_ratio = 0.2
    else:  # General Fitness or Endurance
        calorie_factor = 1.0
        protein_ratio = 0.25
        carb_ratio = 0.5
        fat_ratio = 0.25
    
    # Display recommendations
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Daily Calories", f"{int(user_data['weight'] * 33 * calorie_factor)} kcal")
    with col2:
        st.metric("Protein Intake", f"{int(user_data['weight'] * 2.2)} g")
    with col3:
        st.metric("Water Intake", f"{int(user_data['weight'] * 0.033 * 1000)} ml")
    
    st.markdown("""
    **Macronutrient Breakdown:**
    - Protein: {protein_ratio*100:.0f}% of calories (for muscle repair/growth)
    - Carbohydrates: {carb_ratio*100:.0f}% of calories (energy)
    - Fats: {fat_ratio*100:.0f}% of calories (hormone production)
    """.format(**locals()))
    
    st.markdown("""
    **General Guidelines:**
    - Eat whole, minimally processed foods
    - Include protein with every meal
    - Stay hydrated throughout the day
    - Time carbohydrates around workouts
    """)
    
    # Pre/Post workout nutrition
    st.subheader("Pre- and Post-Workout Nutrition")
    
    if user_data["fitness_goal"] == "Weight Loss":
        st.markdown("""
        **Pre-Workout (1-2 hours before):**
        - Light protein + complex carbs (e.g., Greek yogurt with berries)
        - Hydrate well
        
        **Post-Workout (within 30 min):**
        - Lean protein + vegetables (e.g., grilled chicken with salad)
        - Optional small portion of carbs
        """)
    elif user_data["fitness_goal"] == "Muscle Gain":
        st.markdown("""
        **Pre-Workout (1-2 hours before):**
        - Protein + complex carbs (e.g., chicken with rice)
        - Consider caffeine for energy
        
        **Post-Workout (within 30 min):**
        - Fast-digesting protein + carbs (e.g., whey protein with banana)
        - 3:1 ratio of carbs to protein
        """)
    else:  # General fitness/endurance
        st.markdown("""
        **Pre-Workout (1-2 hours before):**
        - Balanced meal with carbs and protein
        - Avoid heavy fats
        
        **Post-Workout (within 1 hour):**
        - Protein + carbs to replenish glycogen
        - Include electrolytes if sweating heavily
        """)
    
    # Indian Food Nutrition Database
    st.subheader("Indian Food Nutrition Database")
    
    if not nutrition_df.empty:
        # Filter options
        col1, col2 = st.columns(2)
        with col1:
            food_category = st.selectbox("Filter by Category", ["All"] + list(nutrition_df["Category"].unique()))
        with col2:
            search_term = st.text_input("Search Food Items")
        
        # Apply filters
        filtered_df = nutrition_df.copy()
        if food_category != "All":
            filtered_df = filtered_df[filtered_df["Category"] == food_category]
        if search_term:
            filtered_df = filtered_df[filtered_df["Food_Item"].str.contains(search_term, case=False)]
        
        # Display table
        st.dataframe(
            filtered_df[["Food_Item", "Category", "Calories (kcal)", "Protein (g)", 
                        "Carbohydrates (g)", "Fat (g)", "Fiber (g)"]].rename(columns={
                "Food_Item": "Food",
                "Calories (kcal)": "Calories",
                "Protein (g)": "Protein",
                "Carbohydrates (g)": "Carbs",
                "Fat (g)": "Fat",
                "Fiber (g)": "Fiber"
            }),
            height=400,
            use_container_width=True
        )
        
        # Meal suggestions based on goal
        st.subheader("Meal Suggestions")
        
        if user_data["fitness_goal"] == "Weight Loss":
            st.markdown("""
            **Balanced Weight Loss Meal:**
            - 1 cup cooked quinoa (222 kcal, 8g protein)
            - 100g grilled chicken breast (165 kcal, 31g protein)
            - 1 cup mixed vegetables (50 kcal, 2g protein)
            - 1 tsp olive oil (40 kcal, healthy fats)
            """)
        elif user_data["fitness_goal"] == "Muscle Gain":
            st.markdown("""
            **Muscle Building Meal:**
            - 1 cup cooked rice (205 kcal, 4g protein)
            - 150g grilled fish (200 kcal, 40g protein)
            - 1/2 cup dal (120 kcal, 8g protein)
            - 1 cup curd (150 kcal, 8g protein)
            - Handful of nuts (200 kcal, healthy fats)
            """)
        else:
            st.markdown("""
            **General Fitness Meal:**
            - 2 rotis (160 kcal, 6g protein)
            - 1 cup mixed vegetables (50 kcal)
            - 100g paneer (265 kcal, 18g protein)
            - 1 cup dal (240 kcal, 16g protein)
            """)
    else:
        st.warning("Nutrition database not available for meal suggestions.")

# Page 5: Workout Planner
def workout_planner_page():
    st.title("📅 Workout Planner")
    
    if "user_data" not in st.session_state:
        st.warning("Please complete your User Profile first to generate a workout plan.")
        return
    
    user_data = st.session_state.user_data
    
    st.subheader(f"Your {user_data['weeks']}-Week {user_data['fitness_goal']} Plan")
    
    # Generate plan based on goal
    if user_data["fitness_goal"] == "Weight Loss":
        plan = {
            "Monday": "Cardio (30-45 min) + Full Body Strength",
            "Tuesday": "HIIT (20 min) + Core Work",
            "Wednesday": "Active Recovery (Yoga/Walk)",
            "Thursday": "Cardio (30-45 min) + Full Body Strength",
            "Friday": "HIIT (20 min) + Core Work",
            "Saturday": "Long Cardio Session (45-60 min)",
            "Sunday": "Rest"
        }
    elif user_data["fitness_goal"] == "Muscle Gain":
        plan = {
            "Monday": "Chest & Triceps",
            "Tuesday": "Back & Biceps",
            "Wednesday": "Legs & Core",
            "Thursday": "Shoulders & Arms",
            "Friday": "Full Body Compound Lifts",
            "Saturday": "Active Recovery",
            "Sunday": "Rest"
        }
    elif user_data["fitness_goal"] == "General Fitness":
        plan = {
            "Monday": "Upper Body Strength",
            "Tuesday": "Cardio (30 min)",
            "Wednesday": "Lower Body Strength",
            "Thursday": "Yoga/Flexibility",
            "Friday": "Full Body Circuit",
            "Saturday": "Cardio (30 min)",
            "Sunday": "Rest"
        }
    elif user_data["fitness_goal"] == "Increased Endurance":
        plan = {
            "Monday": "Long Cardio (45-60 min)",
            "Tuesday": "Interval Training",
            "Wednesday": "Strength (Full Body)",
            "Thursday": "Medium Cardio (30-45 min)",
            "Friday": "Interval Training",
            "Saturday": "Long Cardio (45-60 min)",
            "Sunday": "Active Recovery"
        }
    
    # Display weekly plan
    st.markdown("### Weekly Schedule")
    for day, workout in plan.items():
        st.markdown(f"**{day}:** {workout}")
    
    # Exercise selection for each day
    st.subheader("Exercise Selection")
    
    selected_day = st.selectbox("Select Day to Customize", list(plan.keys()))
    
    # Get exercises for the selected muscle groups
    exercises_db = {
        "Chest & Triceps": ["Push-ups", "Bench Press", "Tricep Dips"],
        "Back & Biceps": ["Pull-ups", "Bent-over Rows", "Bicep Curls"],
        "Legs & Core": ["Squats", "Lunges", "Plank"],
        "Shoulders & Arms": ["Overhead Press", "Lateral Raises", "Bicep Curls"],
        "Full Body Strength": ["Squats", "Push-ups", "Bent-over Rows", "Plank"],
        "Full Body Compound Lifts": ["Squats", "Deadlifts", "Bench Press", "Overhead Press"],
        "Cardio": ["Running", "Cycling", "Swimming"],
        "HIIT": ["Burpees", "Jump Squats", "Mountain Climbers"],
        "Core Work": ["Plank", "Russian Twists", "Leg Raises"],
        "Yoga/Flexibility": ["Sun Salutations", "Warrior Poses", "Forward Folds"]
    }
    
    workout_type = plan[selected_day]
    if "Cardio" in workout_type:
        key = "Cardio"
    elif "HIIT" in workout_type:
        key = "HIIT"
    elif "Yoga" in workout_type:
        key = "Yoga/Flexibility"
    else:
        key = workout_type.split("+")[0].strip()
    
    if key in exercises_db:
        st.markdown(f"**Suggested Exercises for {key}:**")
        for exercise in exercises_db[key]:
            st.markdown(f"- {exercise}")
    else:
        st.info("Customize your exercises based on the workout focus")
    
    # Progression over weeks
    st.subheader("Progression Plan")
    
    weeks = user_data["weeks"]
    
    if user_data["fitness_goal"] == "Weight Loss":
        st.markdown(f"""
        - **Weeks 1-{max(2, weeks//4)}:** Focus on form and building endurance
        - **Weeks {max(2, weeks//4)+1}-{weeks-weeks//4}:** Increase intensity and add intervals
        - **Final {weeks//4} weeks:** Maximize calorie burn with circuit training
        """)
    elif user_data["fitness_goal"] == "Muscle Gain":
        st.markdown(f"""
        - **Weeks 1-{max(2, weeks//4)}:** Master technique with moderate weights
        - **Weeks {max(2, weeks//4)+1}-{weeks-weeks//4}:** Progressive overload - increase weights
        - **Final {weeks//4} weeks:** High intensity techniques (drop sets, supersets)
        """)
    else:
        st.markdown(f"""
        - **Every 2 weeks:** Gradually increase duration or intensity by 10%
        - **Alternate focus:** Strength vs endurance emphasis weekly
        """)
    
    # Downloadable plan
    st.download_button(
        label="Download Workout Plan",
        data=pd.DataFrame.from_dict(plan, orient="index", columns=["Workout"]).to_csv(),
        file_name=f"{user_data['fitness_goal']}_workout_plan.csv",
        mime="text/csv"
    )

if __name__ == "__main__":
    main()
