'use client'

import { FC } from 'react'

const Nya: FC = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (${function () {
            console.log(
              '%c 蝉時雨 %c https://chanshiyu.com ',
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

export default Nya
