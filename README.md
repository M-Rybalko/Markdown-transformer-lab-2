# Markdown-transformer-v2

It is a console app I did as a practice task in KPI University

You can transform a `Markdown` file to `HTML` and write it to a separate file. Also in this new version you can convert a `Markdown` to escape-sequence in your console.

No libs designed to work with Markdown were used.

## Installing the program
***

First up, clone the repository via this command:

    git clone https://github.com/M-Rybalko/Markdown-transformer-lab-2.git

Install the dependencies:

    npm install

Run the program:

    node mdtransformer.js <path-to-md-file> -o <path-to-html-file> -f html

This will transform your markdown text to HTML and write it into the file you provided a path to.
> You are not obliged to put in `-o <path-to-html-file>` option. If you don't do so, the result will be printed in console.

> If you don't add `-f html` flag to your command, or use `esc` instead of `html`, your markdown will convert to escape-sequence and print in the console.

For instance, let's parse our `example.md` file with an outstanding joke in it. It can be done with the command `node mdtransformer.js ./example.md -o ./index.html`
```md
Заходить чоловік в **магазин** і _просить_продавчиню_:

-- Дайте `мені`, **будь ласка**, _200 грам ковбаси_. Але 80 грам відріжте з **одного кінця**, а 120 - з _іншого_
    ```
    Продавчиня **здивувалась**, але зробила `все як він і просив`. Вже майже чоловік вийшов, як вона питає:
    -- А ви що, _з поліції_?
    ```

-- Так, я **поліцейський**. `А як ви дізнались?`

-- _А на вас форма поліцейська_
```
> The tabulation is not present in original examle file but i did it here for the sake of aesthetics :)

The result we will get is:

```html
<p>Заходить чоловік в <b>магазин</b> і <i>просить_продавчиню</i>:</p>
<p>-- Дайте <tt>мені</tt>, <b>будь ласка</b>, <i>200 грам ковбаси</i>. Але 80 грам відріжте з <b>одного кінця</b>, а 120 - з <i>іншого</i>
<pre>
Продавчиня **здивувалась**, але зробила `все як він і просив`. Вже майже чоловік вийшов, як вона питає:
-- А ви що, _з поліції_?
</pre></p>
<p>-- Так, я <b>поліцейський</b>. <tt>А як ви дізнались?</tt></p>
<p>-- <i>А на вас форма поліцейська</i></p>
```

Also let's try to convert our file to the escape sequence and look how will it be converted. The easiest method for this would be running this command: `node mdtransformer.js ./example.md`

The result: 
![image](https://github.com/M-Rybalko/Markdown-transformer-lab-2/assets/45692117/b91abf03-f6ee-480c-a6c4-bbc700e7712c)

## Tests

There are 24 tests available for the application. To run them use this command

    npm run test

You will get a corresponding message in the console after executing the command.

## Dropped tests

[Dropped tests commit link](https://github.com/M-Rybalko/Markdown-transformer-lab-2/commit/58c3107bab637c434ae5fcab59c4bb860f23b533)

## Revert commit

[Revert commit link](https://github.com/M-Rybalko/Markdown-transformer-lab-2/commit/f6ace9ebf4d14ab9f264318b93eeef28ebf666f6)

## Conclusions

In my experience, unit tests have been essential in ensuring the reliability and stability of program. They serve very well in catching bugs early in the development process. While writing tests can be time-consuming, the benefits far outweigh the initial investment. So in my opinion, tests are definitely a must-have in your project.
