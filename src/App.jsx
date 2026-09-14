import HomePage from "./components/HomePage.jsx";
import TextLabPage from "./components/TextLabPage.jsx";
import { useRoute } from "./router/useRoute.js";

// 4.4：把"在哪一页"从内存搬到网址里。
//
// 4.3 的时候，是 useState("home") 记着当前页——好处是简单，
// 坏处是一刷新就回到首页、网址永远是那一个、浏览器后退键也没用。
//
// 现在改成问网址：网址是 / 就是首页，是 /textlab 就是文字实验室。
// 网址刷新不丢，所以刷新还在这一页；后退键也能用了。
//
// 下面这两张表就是"网址"和"页面"之间的翻译：
//   PATH_TO_PAGE  网址 → 页面 key（组件认识的是 key："home" / "textlab"）
//   PAGE_TO_PATH  页面 key → 网址（点导航时用它把网址改掉）
const PATH_TO_PAGE = {
  "/": "home",
  "/textlab": "textlab",
};

const PAGE_TO_PATH = {
  home: "/",
  textlab: "/textlab",
};

export default function App() {
  // useRoute 给两样东西：
  //   path      —— 当前网址（变化时组件会重新渲染）
  //   navigate  —— 改网址（同时也会让界面跟着换）
  const { path, navigate } = useRoute();

  // 网址不认识（比如手输了一个乱写的路径）就当首页处理。
  const page = PATH_TO_PAGE[path] ?? "home";

  // 组件里点导航传来的还是 key，这里翻译成网址再交给 navigate。
  function go(key) {
    navigate(PAGE_TO_PATH[key] ?? "/");
  }

  return (
    <div className="app-shell">
      <div className="page-shell">
        <main className="page-content">
          {/* 两个页面来回切——靠的是组件，不再是两个独立的 html 文件 */}
          {page === "home"
            ? <HomePage current={page} onNavigate={go} />
            : <TextLabPage current={page} onNavigate={go} />}
        </main>
      </div>
    </div>
  );
}
