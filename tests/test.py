from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import unittest

class TestAuth(unittest.TestCase):
    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")

        self.driver = webdriver.Chrome(chrome_options=chrome_options)
        self.driver.set_window_size(1936, 1096)

    def test_login(self):
        self.driver.get("http://perfui.herokuapp.com")
        try:
            element = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located(
                    By.XPATH, '/html/body/section[1]/nav/div[2]/div[2]/div/a[1]/strong')
            )
            element.click()
            self.driver.find_element_by_id('email').send_keys("yajananrao@gmail.com")
            self.driver.find_element_by_id('password').send_keys('yajana')
            self.driver.find_element_by_xpath('/html/body/section[2]/section[2]/div/div/div/div/form/button').click()
        except:
            self.driver.save_screenshot('login.png')
        finally:
            assert self.driver.current_url,"http://perfui.herokuapp.com/project/index"

    def test_signup(self):
        self.driver.get("http://perfui.herokuapp.com")
        try:
            element = WebDriverWait(self.driver,10).until(
                EC.presence_of_element_located(
                    By.XPATH, '/html/body/section[1]/nav/div[2]/div[2]/div/a[2]/strong')
            )
            element.click()
            self.driver.find_element_by_id('name').send_keys("Yajana")
            self.driver.find_element_by_id('email').send_keys("yajananrao@gmail.com")
            self.driver.find_element_by_xpath(
                '/html/body/section[2]/section[2]/div/div/div/div/form/div[3]/div/div/div/input').send_keys("yajana")
            self.driver.find_element_by_xpath(
                '/html/body/section[2]/section[2]/div/div/div/div/form/button').click()
            text = self.driver.find_element_by_xpath(
                '/html/body/section[2]/section[1]/div/div/p').text
            print(text)
        except:
            self.driver.save_screenshot('signup.png')
            
    def tearDown(self):    
        self.driver.quit() 

if __name__ == "__main__":
    suite = unittest.TestLoader().loadTestsFromTestCase(TestAuth)
    unittest.TextTestRunner(verbosity=0).run(suite)
