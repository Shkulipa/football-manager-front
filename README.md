# Run
```yarn dev```

# CI/CD (deploy)
1. for front here using "railway" for the "same site" for fixing error with different domains(safari as example has problems in cookies)

# Todo
- [X] Login
- [X] Errors fetching
- [X] Refresh tokens after expired access token
- [X] Tactic in single match
    - [X] Drag from Football Field
        - [X] into Football Field
        - [X] into Main table
        - [X] into Bench
    - [X] Drag from Main Table
        - [X] into Main table
        - [X] into Football Field
        - [X] into Bench
    - [X] Drag from Bench
        - [X] into Football Field
        - [X] into Main Table
- [X] Sign up
- [X] Activation email
- [X] Login with not activated account
- [X] Restore forgot pass
- [X] User Team
    - [X] Create user team
    - [X] Set/update squad in user team
        - [X] Drag from Football Field
            - [X]  into Football Field(move player to another position with player)
            - [X]  into Football Field(if position is free)
            - [X]  into Main table(change position with another player)
            - [X]  into Bench
            - [X]  into Reserve
        - [X] Drag from Main Table
            - [X]  into Football Field(if position is free)
            - [X]  into Football Field(if position is taken by another player)
            - [X]  into Main table(change position with another player)
            - [X]  into Bench
            - [X]  into Reserve
        - [X] Drag from Bench
            - [X]  into Football Field(free field)
            - [X]  into Football Field(with replace player from bench player)
            - [X]  into Main table(instead of exist player there)
            - [X]  into Reserve
        - [X] Drag from Reserve
            - [X]  into Football Field(if free position)
            - [X]  into Football Field(if position is taken by another player)
            - [X]  into Bench table
    - [X] Update Rating after changing main squad
    - [X] Update logo club
    - [X] Disable update, if nothing changed
    - [X] Delete user team (with confirmation modal)
- [X] Rating match (finding opponent...)
- [X] Rating match (playing in real time)
    - [X] Rejoin to match
    - [X] When match was finished, and second player wants to join into this moment
    - [X] Update tactic(Make replacements, move players)
        - [X] Drag from Football Field
            - [X]  into Football Field(move player to another position with player)
            - [X]  into Football Field(if position is free)
            - [X]  into Main table(change position with another player)
            - [X]  into Bench
        - [X] Drag from Main Table
            - [X]  into Football Field(if position is free)
            - [X]  into Football Field(if position is taken by another player)
            - [X]  into Main table(change position with another player)
            - [X]  into Bench
        - [X] Drag from Bench
            - [X]  into Football Field(free field)
            - [X]  into Football Field(with replace player from bench player)
            - [X]  into Main table(instead of exist player there)
    - [X] Update with server(send request to the server about updated squad)
    - [X] Update squad with replacements
        - [X] Replacements
            - [X] 1/3 players from bench into field
            - [X] 2/3 players from bench into field
            - [X] 3/3 players from bench into field
            - [X] replace new recently player that was into bench (make replace then make it again with recently new player from bench)
            - [X] make 2 replacements, and replace 1 of them
        - [X] Move player(s)
            - [X] 1 move player in another position
            - [X] 2 move player in another position
            - [X] 3 move player in another position
        - [X] Replacements with move
            - [X] 1/3 player replace from bench into field and move another position
            - [X] 2/3 player replace from bench into field and move another position (1 player in another position)
            - [X] 3/3 player replace from bench into field and move another position (2 player in another position)
            - [X] 3/3 player replace from bench into field and move another position (3 player in another position)
            - [X] make 2 replacements, and replace 1 of them (that wasn't replaced - move into another position)
            - [X] make 2 replacements, and replace 1 of them (that was replaced - move into another position)
            - [X] make 2 replacements, and replace 1 of them (move both players in other positions)
- [X] Deploy railway
- [X] Instead of generated simulations array, get last iteration from Back End
- [X] Bug spikes in rating match
- [X] Common Chat(with scalable for directs chats)
- [X] Rating all players(with pagination)
- [X] Social Login
    - [X] Google
    - [X] Facebook
- [X] Shop (buy packs)
- [X] User inventory(where you can open packs)
- [X] Open packs
- [X] Privacy Policy
- [X] Terms and Conditions
- [X] Auction
    - [X] Auction get lots
    - [X] Auction create lot
    - [X] Auction cancel lot
    - [X] Auction buy lot
- [X] Search(4 categories before searching)
    - [X] Page players
    - [X] Page real teams
- [X] Profile
    - [X] User update password
    - [X] User update username
    - [X] User update email
- [X] Google analytics
    - https://analytics.google.com/
    - https://gaudion.dev/blog/setup-google-analytics-with-gdpr-compliant-cookie-consent-in-nextjs13, https://gaudion.dev/info/cookies
- [X] Home tutorials with video from youtube

# next js docs
https://nextjs.org/docs

# UI library
https://primereact.org/carousel/

# react dnd
https://react-dnd.github.io/react-dnd/examples/dustbin/single-target

# Sockets
docs: https://socket.io/docs/v4/client-initialization/
https://www.youtube.com/watch?v=o43iiH4kGqg&t=1610s&ab_channel=UlbiTV
https://www.youtube.com/watch?v=djMy4QsPWiI&ab_channel=PedroTech

# google analytics
https://www.youtube.com/watch?v=2woWjkED-vg