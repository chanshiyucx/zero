export function Nya() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (${function () {
            console.log(
              '%c Reverie %c https://github.com/chanshiyucx ',
              'color: #FFF; margin: 1em 0; padding: 5px 0; background: #2980b9;',
              'margin: 1em 0; padding: 5px 0; background: #EFEFEF;',
            )
            console.log(
              '%c Zero %c https://github.com/chanshiyucx/zero ',
              'color: #FFF; margin: 1em 0; padding: 5px 0; background: #39C5BB;',
              'margin: 1em 0; padding: 5px 0; background: #EFEFEF;',
            )
          }.toString()})();
      `,
      }}
    />
  )
}
