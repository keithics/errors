#Error Package

Handles most of the express catch in all routes and errors.

# How to use
```
export const profile = catchAsync(async (req: Request, res: Response) => {
    const user = await User.findById(req.user);
    arkAssert(user, ErrorNotFound);
    return res.jsonp(user);
});
```

#Requirements
1. GitHub personal tokens
2. You must be logged-in in order to run the commands below

##Commands

### Auto Patching Version
`npm version patch`

### Publishing
`npm publish`
