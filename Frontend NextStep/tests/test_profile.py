from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

# ---------- Test Cases ----------
test_cases = [
    {
        "desc": "✅ Valid Profile Update",
        "phone": "9876543210",
        "expect_success": True
    },
    {
        "desc": "⚠️ Empty Phone Number",
        "phone": "",
        "expect_success": False
    },
    {
        "desc": "⚠️ Invalid Phone Number (Too Short)",
        "phone": "12345",
        "expect_success": False
    }
]

# ---------- Setup ----------
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.maximize_window()

# ---------- Step 1: Login ----------
driver.get("http://localhost:5173/login")

WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "email")))
driver.find_element(By.NAME, "email").send_keys("rishabh1352@gmail.com")
driver.find_element(By.NAME, "password").send_keys("Mohsin@1352")
driver.find_element(By.XPATH, "//button[contains(text(),'Login')]").click()

# Wait for redirect to /profile or load manually
# Handle alert on login failure (optional)
try:
    WebDriverWait(driver, 3).until(EC.alert_is_present())
    alert = driver.switch_to.alert
    print("⚠️ Login Alert:", alert.text)
    alert.accept()
    driver.quit()
    exit("❌ Login failed. Test aborted.")
except:
    pass  # No alert — continue

# ---------- Step 2: Profile Tests ----------
for case in test_cases:
    print(f"\n🔍 Running Test Case: {case['desc']}")

    # Ensure on profile page
    driver.get("http://localhost:5173/profile")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//button[contains(text(),'EDIT')]")))
    time.sleep(1)

    # Click Edit
    driver.find_element(By.XPATH, "//button[contains(text(),'EDIT')]").click()
    time.sleep(2)

    # Fill phone number
    phone_input = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "phone")))
    phone_input.clear()
    phone_input.send_keys(case["phone"])

    # Select state
    state_select = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.NAME, "state")))
    state_options = state_select.find_elements(By.TAG_NAME, "option")
    if len(state_options) > 1:
        state_options[1].click()

    # Select city (after state loads)
    time.sleep(2)
    city_select = driver.find_element(By.NAME, "city")
    city_options = city_select.find_elements(By.TAG_NAME, "option")
    if len(city_options) > 1:
        city_options[1].click()

    # Save
    driver.find_element(By.XPATH, "//button[contains(text(),'SAVE')]").click()
    time.sleep(2)

    # Result Verification
    try:
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, "//button[contains(text(),'EDIT')]")))
        if case["expect_success"]:
            print("✅ Test Passed: Profile updated successfully.")
        else:
            print("❌ Test Failed: Invalid input was incorrectly accepted.")
    except:
        if case["expect_success"]:
            print("❌ Test Failed: Valid input rejected or save failed.")
        else:
            print("✅ Test Passed: Invalid input correctly blocked.")

driver.quit()
