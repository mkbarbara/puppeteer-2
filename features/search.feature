Feature: Booking tickets

  Scenario: Success booking one place
    Given Navigation menu is loaded
    When I click the second day in the navigation menu
    And I click the first movie seance time
    And I click the first standard chair in the buying scheme
    And I click the accept button
    Then I should see ticket details with cost "150"

  Scenario: Success booking VIP place
    Given Navigation menu is loaded
    When I click the second day in the navigation menu
    And I click the first movie seance time
    And I click the first VIP chair in the buying scheme
    And I click the accept button
    Then I should see ticket details with cost "350"

  Scenario: Cant book busy place
    Given Navigation menu is loaded
    When I click the second day in the navigation menu
    And I click the first taken chair in the buying scheme
    Then the accept button should be disabled