import pandas as pd
import os

# Load data once
DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "rainfall_raw.csv")

def get_yearly_rainfall(state_name):
    try:
        # Optimization: Read only necessary columns
        df = pd.read_csv(DATA_PATH, usecols=['state_name', 'date', 'actual'])
        
        # Filter by state
        state_df = df[df['state_name'].str.lower() == state_name.lower()].copy()
        
        if state_df.empty:
            return []

        # Extract year
        state_df['date'] = pd.to_datetime(state_df['date'])
        state_df['year'] = state_df['date'].dt.year
        
        # Group by year and sum rainfall (annual rainfall)
        # Using sum because 'actual' is likely daily/monthly rainfall, we need annual total.
        # If 'actual' is already annual, we would take mean. 
        # Looking at sample: "2009-04-01 ... 0.0", likely daily.
        # So we sum per year.
        annual_rainfall = state_df.groupby('year')['actual'].sum().reset_index()
        
        # Format for frontend
        result = annual_rainfall.to_dict('records')
        return result
    except Exception as e:
        print(f"Error processing rainfall data: {e}")
        return []

def get_crop_economics():
    # Hardcoded estimates (Values can be adjusted based on real Indian market data)
    # Yield in Quintals/Acre, Price in INR/Quintal, Profit in INR/Acre
    # Formula: (Yield * Price) - Cost (Hidden estimate) = Profit
    return [
        {"crop": "Rice", "yield_per_acre": 20, "price_per_quintal": 2200, "profit_per_acre": 25000},
        {"crop": "Wheat", "yield_per_acre": 18, "price_per_quintal": 2100, "profit_per_acre": 22000},
        {"crop": "Maize", "yield_per_acre": 25, "price_per_quintal": 1800, "profit_per_acre": 28000},
        {"crop": "Cotton", "yield_per_acre": 10, "price_per_quintal": 6000, "profit_per_acre": 35000},
        {"crop": "Sugarcane", "yield_per_acre": 300, "price_per_quintal": 310, "profit_per_acre": 45000}, # Price per quintal is lower but yield is huge
        {"crop": "Chickpea", "yield_per_acre": 8, "price_per_quintal": 5300, "profit_per_acre": 20000},
        {"crop": "Groundnut", "yield_per_acre": 10, "price_per_quintal": 5800, "profit_per_acre": 30000},
        {"crop": "Mustard", "yield_per_acre": 8, "price_per_quintal": 5000, "profit_per_acre": 24000},
        {"crop": "Potato", "yield_per_acre": 100, "price_per_quintal": 1200, "profit_per_acre": 60000},
        {"crop": "Tomato", "yield_per_acre": 80, "price_per_quintal": 1500, "profit_per_acre": 70000},
        {"crop": "Onion", "yield_per_acre": 90, "price_per_quintal": 1800, "profit_per_acre": 80000},
        {"crop": "Soybean", "yield_per_acre": 12, "price_per_quintal": 4000, "profit_per_acre": 28000},
    ]
