import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Scene3DPanelView, { SurfaceData } from './Scene3DPanelView/Scene3DPanelView'
import { WorkspaceSurface, WorkspaceSurfaceScalarField } from './Scene3DPanelView/VolumeViewData'

function App() {
  const [count, setCount] = useState(3)

  useEffect(() => {
    let canceled = false
    function iter() {
      if (canceled) return
      setCount(c => (c + 1))
      setTimeout(() => {
        iter()
      }, 1000)
    }
    iter()
    return () => {canceled = true}
  }, [])

  const surfaceData: SurfaceData = useMemo(() => {
    const vertices: number[][] = []
    const faces: number[][] = []
    const scalar = []
    for (let i = 0; i < count; i++) {
      vertices.push([i, 0, 1], [i, 1, 0], [i + 1, 0, 0])
      faces.push([3 * i, 3 * i + 1, 3 * i + 2])
      scalar.push(1)
      scalar.push(2)
      scalar.push(3)
    }
    const surface: WorkspaceSurface = {
      name: 'S1',
      vertices,
      faces
    }
    const scalarField: WorkspaceSurfaceScalarField = {
      name: 'sf1',
      surfaceName: 'S1',
      data: scalar
    }
    return {
      surface,
      scalarField
    }
  }, [count])

  const scene3DOpts = useMemo(() => (
    {
      showReferencePlanes: true,
      transparentReferencePlanes: false,
      referencePlanesOpacity: 1,
      showReferenceLines: true
    }
  ), [])

  return (
    <div className="App">
      Test wxyz
      <Scene3DPanelView
        surfacesData={[surfaceData]}
        surfaceScalarDataRange={[0, 6]}
        scene3DOpts={scene3DOpts}
        width={300}
        height={300}
      />
    </div>
  )
}

export default App
