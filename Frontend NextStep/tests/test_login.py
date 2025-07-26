from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

# Test cases for login
test_cases = [
    {
        "desc": "Valid Login",
        "data": {
            "email": "rishabh1352@gmail.com",
            "password": "Mohsin@1352",
        },
        "expect_success": True
    },
    {
        "desc": "Invalid Email",
        "data": {
            "email": "wrong@example.com",
            "password": "StrongPass123!",
        },
        "expect_success": False
    },
    {
        "desc": "Wrong Password",
        "data": {
            "email": "validuser1@example.com",
            "password": "WrongPass123",
        },
        "expect_success": False
    },
    {
        "desc": "Empty Credentials",
        "data": {
            "email": "",
            "password": "",
        },
        "expect_success": False
    },
]

# Setup WebDriver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.maximize_window()

for case in test_cases:
    print("\nRunning:", case["desc"])
    driver.get("http://localhost:5173/login")

    # Wait for login form to load
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "email")))

    # Fill login form
    email_input = driver.find_element(By.NAME, "email")
    password_input = driver.find_element(By.NAME, "password")

    email_input.clear()
    password_input.clear()
    email_input.send_keys(case["data"]["email"])
    password_input.send_keys(case["data"]["password"])

    # Submit form
    driver.find_element(By.XPATH, "//button[contains(text(), 'Login')]" ).click()

    time.sleep(2)

    try:
        WebDriverWait(driver, 3).until(EC.alert_is_present())
        alert = driver.switch_to.alert
        alert_text = alert.text
        print("⚠️ Alert Text:", alert_text)
        alert.accept()

        if case["expect_success"]:
            print("❌ Test Failed: Expected success but got alert")
        else:
            print("✅ Test Passed: Expected failure")
    except:
        # No alert means success
        if case["expect_success"]:
            print("✅ Test Passed: Login successful")
        else:
            print("❌ Test Failed: Expected failure but no alert shown")

driver.quit()
