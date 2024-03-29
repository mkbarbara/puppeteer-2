Feature: Booking tickets

  Scenario: Success booking one place
    Given I am on the home page
    When I click the second day in the navigation menu
    And I click the first movie seance time
    And I click the first "standart" chair in the buying scheme
    And I click the accept button
    Then I should see ticket details with cost "150"

  Scenario: Success booking VIP place
    Given I am on the home page
    When I click the second day in the navigation menu
    And I click the first movie seance time
    And I click the first "vip" chair in the buying scheme
    And I click the accept button
    Then I should see ticket details with cost "350"

  Scenario: Cant book busy place
    Given I am on the home page
    When I click the second day in the navigation menu
    And I click the first movie seance time
    And I click the first "taken" chair in the buying scheme
    Then the accept button should be disabled