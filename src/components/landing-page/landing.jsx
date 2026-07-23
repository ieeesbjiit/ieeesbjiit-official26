import { useEffect, useRef } from 'react'
import ieeelogo from './logo.webm'
import Terminal from './Terminal';
import landingVideo from './underwater.mp4'


const Landing = () => {
  // const landingRef = useRef(null)

  // useEffect(() => {
  //   let animationFrame

  //   const updateParallax = () => {
  //     const landing = landingRef.current
  //     if (!landing) return

  //     const { top, height } = landing.getBoundingClientRect()
  //     const progress = Math.max(-1, Math.min(1, -top / height))
  //     landing.style.setProperty('--video-parallax-offset', `${progress * 12}%`)
  //     animationFrame = undefined
  //   }

  //   const onScroll = () => {
  //     if (!animationFrame) animationFrame = requestAnimationFrame(updateParallax)
  //   }

  //   updateParallax()
  //   window.addEventListener('scroll', onScroll, { passive: true })
  //   window.addEventListener('resize', onScroll)

  //   return () => {
  //     window.removeEventListener('scroll', onScroll)
  //     window.removeEventListener('resize', onScroll)
  //     if (animationFrame) cancelAnimationFrame(animationFrame)
  //   }
  // }, [])

  return (
    <>
      <div className='landing'>
      <video className="landingvideo" autoPlay muted loop playsInline>
          <source src={landingVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      <div style={{ width: '100vw', height: '100vh', position: 'absolute', mixBlendMode: 'screen' }}>
      <Terminal
          scale={2.2}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.6}
          pause={false}
          scanlineIntensity={0.5}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.1}
          tint="#0a0d10"
          mouseReact
          mouseStrength={0.5}
          pageLoadAnimation
          brightness={0.6}
        />
      </div>
      <div className="landingLeft">
        <div className="title">
          <span>IEEE Student Branch JIIT</span>
        </div>
        <div className="subtitle">
          <span>Advancing Technology for <em>Humanity</em></span>
        </div>
      </div>
        <video className="ieeevideo" autoPlay muted loop playsInline>
          <source src={ieeelogo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
      </div>

      
    </>
  )
}

export default Landing
