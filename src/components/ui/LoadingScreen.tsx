export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="h-20 w-20 scale-110">
        <div className="box box-1">
          <div className="side-left bg-primary"></div>
          <div className="side-right bg-primary/90"></div>
          <div className="side-top bg-primary/50"></div>
        </div>
        <div className="box box-2">
          <div className="side-left bg-primary"></div>
          <div className="side-right bg-primary/90"></div>
          <div className="side-top bg-primary/50"></div>
        </div>
        <div className="box box-3">
          <div className="side-left bg-primary"></div>
          <div className="side-right bg-primary/90"></div>
          <div className="side-top bg-primary/50"></div>
        </div>
        <div className="box box-4">
          <div className="side-left bg-primary"></div>
          <div className="side-right bg-primary/90"></div>
          <div className="side-top bg-primary/50"></div>
        </div>
      </div>
    </div>
  )
}

export function Loader() {
  return (
    <div className="h-20 w-20 scale-110">
      <div className="box box-1">
        <div className="side-left bg-primary"></div>
        <div className="side-right bg-primary/90"></div>
        <div className="side-top bg-primary/50"></div>
      </div>
      <div className="box box-2">
        <div className="side-left bg-primary"></div>
        <div className="side-right bg-primary/90"></div>
        <div className="side-top bg-primary/50"></div>
      </div>
      <div className="box box-3">
        <div className="side-left bg-primary"></div>
        <div className="side-right bg-primary/90"></div>
        <div className="side-top bg-primary/50"></div>
      </div>
      <div className="box box-4">
        <div className="side-left bg-primary"></div>
        <div className="side-right bg-primary/90"></div>
        <div className="side-top bg-primary/50"></div>
      </div>
    </div>
  )
}
