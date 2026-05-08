
const SakuraBlossom = () => {
  return (     
    <>
      {/* keyframe */}
      <style>{`
        @keyframes float {
            0%, 100% { 
                transform:translateY(0) translateX(0);
          }
          50% { 
            transform:translateY(-10px) translateX(-5px);
            }
            }
      `}</style>

      <img src="tree.png" alt="" style={{right:'0', bottom:0,scale:'1.5',opacity:'.4',position:'absolute',zIndex:'0', animation: 'float 6s ease-in-out infinite'}} /> 
    </>
  )
}

export default SakuraBlossom;
