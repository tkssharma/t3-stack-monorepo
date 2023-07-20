import Card from "./Card";

export default function Results({results}: any) {
  return (
    <div className="sm:grid sm:grid-cpls-2 lg:grid-cols-3 max-w-6xl mx-auto py-4">
      {
        results.map((result: any) => {
          return (<Card key={result.id} result={result} />)
        })
      }
    </div>
  )
}