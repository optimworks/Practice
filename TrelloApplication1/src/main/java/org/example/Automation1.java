package org.example;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

public class Automation1 {
    public static void main(String[] args) throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", "D:\\practiceGitHub\\Practice\\TrelloApplication1\\chromedriver_win32\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        driver.get("https://qa-test-environment-stripe.internal.qa.us-east-1.advance.graduway.com/campaigns/campaign-a-1");
        driver.manage().window().maximize();
        System.out.println(driver.getTitle());
        driver.findElement(By.xpath("(//button[text()='MAKE A GIFT'])[1]")).click();
        Thread.sleep(5000);
        driver.findElement(By.cssSelector("*.choose input")).click();
        Thread.sleep(2000);
        driver.findElement(By.id("variable-amount")).sendKeys("10");
        driver.findElement(By.xpath("//span[text()='CONTINUE']")).click();
        driver.findElement(By.id("firstName")).sendKeys("suresh189");
        driver.findElement(By.id("lastName")).sendKeys("salloju132");
        driver.findElement(By.id("email")).sendKeys("suresh1276@gmail.com");
        driver.findElement(By.id("phone")).sendKeys("12879632");
        driver.findElement(By.id("address1")).sendKeys("tempa");
        driver.findElement(By.id("address2")).sendKeys("tempa");
        driver.findElement(By.id("country")).sendKeys(Keys.chord(Keys.CONTROL, "a", Keys.DELETE));
        driver.findElement(By.id("country")).sendKeys("United States");
        WebElement countyr = driver.findElement(By.xpath("//*[text()='United States']"));
        js.executeScript("arguments[0].scrollIntoView();", countyr);
        countyr.click();
        Thread.sleep(5000);
        driver.findElement(By.id("state")).sendKeys("Florida");
        WebElement state = driver.findElement(By.xpath("//*[text()='Florida']"));
        js.executeScript("arguments[0].scrollIntoView();", state);
        state.click();
        driver.findElement(By.id("city")).sendKeys("tempa");
        driver.findElement(By.id("zip")).sendKeys("12453");
        Thread.sleep(3000);
        driver.findElement(By.xpath("//span[text()='CONTINUE']")).click();
    }
}
