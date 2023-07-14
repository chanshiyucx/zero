import Comment from '@/components/Comment'

export default function AboutLayout() {
  return (
    <div className="page prose max-w-full">
      <article>
        <h3>缘起</h3>
        <p>
          蝉時雨，源自日语 せみしぐれ。
          夏日众蝉鸣叫此起彼伏好似落雨，蝉儿们似要将仅存的的生命燃烧奏出最后的音符，绚烂与壮美中氤氲着沉寂与无常，是日本夏天最具代表性的季节物语之一。
          正如蝉儿一般，生命短暂即逝，却仍一无反顾奏出生命的最强音，而我的青春岁月又何尝不期望如此，在最美的年华绽放最璀璨的人间烟火。
          蝉鸣如雨，花宵道中，一如少年。
        </p>
      </article>
      <Comment term="关于" />
    </div>
  )
}
