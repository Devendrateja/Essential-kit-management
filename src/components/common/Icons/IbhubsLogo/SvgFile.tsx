import React from 'react'

class SvgFile extends React.Component {
   render() {
      const { ...props } = this.props
      return (
         <svg width={90} height={90} fill='none' viewBox='0 0 90 90' {...props}>
            <path
               fill='#1B3F70'
               d='M9.262 63.769a.593.593 0 01.16-.417.56.56 0 01.436-.169.558.558 0 01.432.162.578.578 0 01.17.43.563.563 0 01-.602.576.562.562 0 01-.596-.582zm1.024 10.122h-.872v-7.852h.872v7.852zm5.539 0v-10.57h3.123c1.133 0 1.993.234 2.58.703.586.468.88 1.157.878 2.066a2.342 2.342 0 01-.446 1.43c-.307.41-.735.714-1.224.868a2.566 2.566 0 012.051 2.543c0 .935-.302 1.665-.904 2.188-.603.524-1.442.787-2.517.79l-3.541-.018zm.894-5.833h2.44c.746-.014 1.322-.197 1.733-.527.41-.33.614-.829.614-1.472 0-.681-.213-1.185-.636-1.504-.422-.32-1.064-.484-1.922-.484h-2.229v3.987zm0 .756v4.323h2.679c.766 0 1.372-.197 1.82-.592a2.045 2.045 0 00.673-1.615 1.96 1.96 0 00-.15-.846 1.96 1.96 0 00-.494-.703c-.429-.38-1.02-.569-1.776-.569l-2.752.002zm25.627 5.077h-.9v-5.063h-6.044v5.063h-.894v-10.57h.894v4.751h6.044v-4.751h.9v10.57zM55.295 63.32v7.215a3.67 3.67 0 01-.474 1.86c-.307.526-.763.95-1.31 1.218a4.296 4.296 0 01-1.943.424c-1.113 0-2.005-.304-2.676-.912-.672-.608-1.017-1.447-1.037-2.519v-7.285h.887v7.155c0 .89.254 1.581.761 2.075.508.493 1.199.739 2.071.736.871 0 1.56-.247 2.067-.74.506-.494.759-1.181.758-2.063v-7.163h.896zm5.465 10.571v-10.57h3.123c1.136 0 1.996.234 2.58.703.585.468.877 1.157.879 2.066a2.343 2.343 0 01-.447 1.43c-.306.41-.734.714-1.223.868a2.566 2.566 0 012.047 2.542c0 .936-.302 1.665-.904 2.19-.603.523-1.442.786-2.517.789l-3.537-.018zm.895-5.833h2.44c.746-.014 1.322-.197 1.733-.527.41-.33.614-.829.614-1.472 0-.681-.214-1.185-.636-1.504-.422-.32-1.064-.484-1.923-.484h-2.228v3.987zm0 .756v4.323h2.68c.765 0 1.37-.197 1.818-.592a2.034 2.034 0 00.673-1.621 1.961 1.961 0 00-.643-1.549c-.428-.38-1.02-.569-1.777-.569l-2.751.008zm17.19 2.483a1.703 1.703 0 00-.617-1.391c-.411-.342-1.164-.667-2.259-.973-1.094-.307-1.894-.643-2.398-1.007a2.451 2.451 0 01-1.074-1.977 2.446 2.446 0 01.999-2.014c.666-.506 1.517-.758 2.552-.758a4.243 4.243 0 011.885.406c.529.248.976.641 1.29 1.133a2.96 2.96 0 01.457 1.621h-.9a2.208 2.208 0 00-.742-1.745c-.493-.44-1.157-.66-1.99-.66-.809 0-1.453.181-1.932.542a1.682 1.682 0 00-.719 1.415c-.005.255.051.507.164.736.112.23.277.428.482.58.431.34 1.122.64 2.07.899a9.775 9.775 0 012.158.807c.444.237.823.58 1.103.999.257.414.386.894.372 1.381a2.388 2.388 0 01-1 2.004c-.665.503-1.543.755-2.632.756a5.15 5.15 0 01-2.051-.395 3.112 3.112 0 01-1.418-1.117 2.888 2.888 0 01-.483-1.65h.894a2.117 2.117 0 00.835 1.766c.557.43 1.297.646 2.222.646.823 0 1.484-.182 1.984-.545a1.701 1.701 0 00.748-1.459z'
            />
            <path
               fill='#036DB0'
               d='M23.057 31.87L7.367 55.164a2.154 2.154 0 001.776 3.355h31.385a2.157 2.157 0 001.901-1.141 2.152 2.152 0 00-.114-2.214L26.63 31.87a2.15 2.15 0 00-3.573 0z'
            />
            <path
               fill='#4CC7F4'
               d='M51.323 16.056L25.05 54.744a2.401 2.401 0 00-.137 2.481 2.409 2.409 0 002.129 1.282h52.55a2.41 2.41 0 001.992-3.762L55.31 16.054a2.413 2.413 0 00-3.986.001z'
            />
         </svg>
      )
   }
}

export default SvgFile
