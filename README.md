# Angular + Spring-boot

+ Material
+ FlexLayout

## Building

Add an execution to install the modules used in the application:

```
<execution>
    <id>npm-install</id>
    <goals>
        <goal>npm</goal>
    </goals>
</execution>
```

Install the modules again using `./mvnw generate-resources` and check the result (the versions will differ for you).



At this point, the tests work:

```
$ ./ng e2e
..
[13:59:46] I/direct - Using ChromeDriver directly...
Jasmine started

  client App
✓ should display welcome message

Executed 1 of 1 spec SUCCESS in 0.718 sec.
[13:59:48] I/launcher - 0 instance(s) of WebDriver still running
[13:59:48] I/launcher - chrome #01 passed
```

and if you add this as well:

```
    <execution>
        <id>npm-build</id>
        <goals>
            <goal>npm</goal>
        </goals>
        <configuration>
            <arguments>run-script build</arguments>
        </configuration>
    </execution>
```

then the client app will be compiled during the Maven build.

### Stabilize the Build

If you want a stable build you should put a `^` before the version of `@angular/cli` in your `package.json`. It isn't added by default when you do `ng new`, but it protects you from changes in the CLI. Example:

.package.json
```
...
"devDependencies": {
    "@angular/cli": "^1.4.9",
...
```

## Development Time

You can build continuously with

```
$ ./ng build --watch
```

Updates are built (quickly) and pushed to `target/classes` where they can be picked up by Spring Boot. Your IDE might need to be tweaked to pick up the changes automatically (Spring Tool Suite does it out of the box).

That's it really, but we can quickly look into a couple of extra things that will get you off the ground quickly with Spring Boot and Angular.

### VSCode

https://code.visualstudio.com/[Microsoft VSCode] is quite a good tool for developing JavaScript applications, and it also has good support for Java and Spring Boot. If you install the "Java Extension Pack" (from Microsoft), the "Angular Essentials" (from Jon Papa) and the "Latest TypeScript and JavaScript Grammar" (from Microsoft) you will be able to do code completion and source navigation in the Angular app (all those extensions and discoverable from the IDE). There are also some Spring Boot features that you need to download and install (in Extensions view click on top right and choose `Install from VSIX...`) at http://dist.springsource.com/snapshot/STS4/nightly-distributions.html.

What VSCode doesn't have currently is automatic detection of `npm` build tools in the project itself (and ours is in `.` so we need it). So to build from the IDE you might need to add a `.vscode/tasks.json` something like this:

```
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "ng-build",
            "type": "shell",
            "command": "./ng build"
        },
        {
            "label": "ng-watch",
            "type": "shell",
            "command": "./ng build --watch"
        }
    ]
}
```

With that in place your `Tasks->Run Task...` menu should include the `ng-watch` option, and it will run the angular build for you and re-compile if you make changes. You could add other entries for running tests.
```

