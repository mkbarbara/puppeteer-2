Feature: Booking tickets

  Background:
    Given I navigate to "https://qamid.tmweb.ru/client/index.php"
    And I wait for the navigation menu to appear

  Scenario: Success booking one place
    When I click the second day in the navigation menu
    And I click the first movie seance time
    And I click the first standard chair in the buying scheme
    And I click the accept button
    Then I should see ticket details with cost "150"

  Scenario: Success booking VIP place
    When I click the second day in the navigation menu
    And I click the first movie seance time
    And I click the first VIP chair in the buying scheme
    And I click the accept button
    Then I should see ticket details with cost "350"

  Scenario: Cant book busy place
    When I click the second day in the navigation menu
    And I click the first taken chair in the buying scheme
    Then the accept button should be disabled