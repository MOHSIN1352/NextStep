from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

# Test cases
test_cases = [
    {
        "desc": " Valid signup",
        "data": {
            "name": "Test User",
            "email": "validuser1@example.com",
            "phone_no": "9999999999",
            "password": "StrongPass123!",
            "gender": "male",
            "dob": "2000-01-01",
        },
        "expect_alert_contains": "successful"
    },
    {
        "desc": " Empty Fields",
        "data": {
            "name": "", "email": "", "phone_no": "", "password": "", "gender": "", "dob": ""
        },
        "expect_alert_contains": "Please fill in all fields"
    },
    {
        "desc": " Invalid Email",
        "data": {
            "name": "Test User",
            "email": "invalid-email",
            "phone_no": "9999999999",
            "password": "StrongPass123!",
            "gender": "male",
            "dob": "2000-01-01",
        },
        "expect_alert_contains": "Signup failed"
    },
    {
        "desc": " Weak Password",
        "data": {
            "name": "Test User",
            "email": "weakpass@example.com",
            "phone_no": "9999999999",
            "password": "123",
            "gender": "male",
            "dob": "2000-01-01",
        },
        "expect_alert_contains": "Signup failed"
    },
    {
        "desc": " DOB Out of Range",
        "data": {
            "name": "Test User",
            "email": "dobfail@example.com",
            "phone_no": "9999999999",
            "password": "StrongPass123!",
            "gender": "male",
            "dob": "1960-01-01",
        },
        "expect_alert_contains": "Date of birth"
    }
]

# Setup driver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.maximize_window()

for case in test_cases:
    print("\n Running:", case["desc"])
    driver.get("http://localhost:5173/signup")

    # Wait until ready
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "email")))

    # Fill the form
    data = case["data"]
    driver.find_element(By.NAME, "name").clear()
    driver.find_element(By.NAME, "name").send_keys(data.get("name", ""))
    driver.find_element(By.NAME, "email").clear()
    driver.find_element(By.NAME, "email").send_keys(data.get("email", ""))
    driver.find_element(By.NAME, "phone_no").clear()
    driver.find_element(By.NAME, "phone_no").send_keys(data.get("phone_no", ""))
    driver.find_element(By.NAME, "password").clear()
    driver.find_element(By.NAME, "password").send_keys(data.get("password", ""))
    driver.find_element(By.NAME, "gender").send_keys(data.get("gender", ""))

    # Set DOB via JS
    dob_input = driver.find_element(By.NAME, "dob")
    driver.execute_script("""
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(arguments[0], arguments[1]);
    arguments[0].dispatchEvent(new Event('input', { bubbles: true }));
    arguments[0].dispatchEvent(new Event('change', { bubbles: true }));
    """, dob_input, data.get("dob", ""))

    # Wait & Select state
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "state")))
    time.sleep(1)
    state_options = driver.find_elements(By.XPATH, '//select[@name="state"]/option')
    if len(state_options) > 1:
        state_options[1].click()

    # Wait & Select city
    time.sleep(2)
    city_options = driver.find_elements(By.XPATH, '//select[@name="city"]/option')
    if len(city_options) > 1:
        city_options[1].click()

    # Submit
    driver.find_element(By.XPATH, "//button[contains(text(), 'Signup')]").click()
    time.sleep(2)

    try:
        WebDriverWait(driver, 3).until(EC.alert_is_present())
        alert = driver.switch_to.alert
        text = alert.text
        print(" Alert Text:", text)
        alert.accept()

        if case["expect_alert_contains"].lower() in text.lower():
            print(" Test Passed")
        else:
            print(" Test Failed: Unexpected alert text")

    except:
        print(" Test Failed: No alert shown")

driver.quit()
