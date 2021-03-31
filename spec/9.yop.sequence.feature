Feature: Generate sequence diagram

    Scenario: Happy path
        Given I enter the following json
        """
        {
            "config": {
                "padding": 2,
                "margin": 4
            },
            "actors": [
                { "name": "superman" },
                { "name":"batman" }
            ],
            "steps": [
                { "description":"superman -> batman : hello"}
            ]
        }
        """
        When I click generate
        Then I see the following diagram
        """
        +------------+    +----------+
            |  superman  |    |  batman  |
            +------------+    +----------+
            |                 |
            |hello            |
            |---------------->|
        """