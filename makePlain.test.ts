import { assertStrictEquals } from "./deps/assert.ts";
import { makePlain } from "./makePlain.ts";

Deno.test("makePlain()", () => {
  assertStrictEquals(
    makePlain(`記法サンプル
[Settings]で設定した[UserCSS]の表示テスト用ページ


[** でかい文字]
[* 1]
[** 2]
[*** 3]
[**** 4]
[***** 5]
[****** 6]
[******* 7]
[******** 8]
[********* 9]
[********** 10]

[** リンク]
#ハッシュタグ
[リンク]
[###存在しないリンク###]
[/help-jp/ブラケティング] （外部プロジェクトリンク）
[外部プロジェクトリンク(scrapbox.io) https://scrapbox.io/help-jp/ブラケティング]

[* [外部リンクを区別するUserCSS]]
 [外部サイトリンク https://example.com/]
 [https://twitter.com/shokai/status/1480481768247549954 Twitterのリンク]
[* [特定のリンクにアイコンをつけるUserCSS]]
 [https://github.com/ GitHubのリンク]
 [https://ja.wikipedia.org ウィキペディアのリンク]
 [https://www.mhlw.go.jp/content/10900000/000622211.pdf PDFへのリンク]
 [Amazonのリンク https://www.amazon.co.jp]

[** コードブロック]
code:コードブロック.py
 print("Hello World!")
ファイル名なしコードブロック
code:py
 print("Hello World!")
インデントつき
 code:インデント.md
  - インデント
    - インデント
言語を強制
 code:python(js)
  console.log("I'm JavaScript");
[文芸的プログラミング]
 標準ヘッダファイルをインクルード
  code:main.cpp
   #include <iostream>

 main函数の定義
  code:main.cpp
   int main() {
     std::cout << "Hello, C++" << "from scrapbox.io" << std::endl;
   }


[** テーブル]
table:表組み
 ■	列2
 行2	■
 [リンク]	[イドバタニシ.icon]アイコン	[イドバタニシ.icon*3]
 と 	て	も	な	が	い	て	ー	ぶ	る	の	て	す	と	The	test	for	very	long	table
文芸的CSV
 table:plot
  x	y
  0	1
  1	1
  2	2
  3	3
 フィボナッチだ！
 table:plot
  4	5
  5	8
  6	13
  7	21
  8	34
  9	55

[** 数式]
 [$ e^{i\\theta}=\\cos\\theta+i\\sin\\theta]
 文章の中に[$ \\text{数式}]を入れる
  [$ a_{n+1}=a_n+1]
  あれ？箇条書きの点消えるんじゃなかったっけ？
  [数式行にも常にバレットを表示するUserCSS]が利いてるっぽい
	[Scrapboxの数式記法]

[** 文字装飾とか]
通常
[[太字]]
 [[[リンク]入り太字]]
 [[[リンク]は書き込めるが、[* 文字装飾]は書き込めない]
[- 取り消し線]
[_ 下線]
[/ 斜体(Italic)]
\`インラインコード\`
>引用文
 > インデントつき[_ 引用文]
 > 中には[リンク]や[$ \\text{数式}]も書けます
? Helpfeel
$ コマンド
% コマンド
[    ]: [空白記法]

[** ブラケット記法]
デフォルト
	\`[]\`:[[abcABC123あいう]]
		[マーカー記法]
	\`*\`: [* abcABC123あいう]
	\`/\`: [/ abcABC123あいう]
 \`-\`: [- abcABC123あいう]
 \`_\`: [_ abcABC123あいう]
UserCSS
 \`"\`: [" abcABC123あいう]
 	[インライン引用記法]
 \`#\`: [# abcABC123あいう]
 	[- [ネタバレ防止記法]]
 		無効化された
 	[白黒記法]
 		[*******# [イドバタニシ.icon]]
 \`%\`: [% abcABC123あいう]
 	[スプレッドシート的に使う記法]
 \`&\`: [& abcABC123あいう]
 	[愚痴記法]
 \`'\`: [' abcABC123あいう]
 	[中央揃え記法]
 \`.\`: [. abcABC123あいう]
 	[リンクを出典アイコンにするUserCSS][. [Settings#6157ebcf1280f00000ad87f1]]
 \`{\`: [{ abcABC123あいう]
 \`}\`: [} abcABC123あいう]
 	[ふきだし記法]
 \`|\`: [| abcABC123あいう]
 	[画像を並べて表示する記法]
 	[***| 123456]
 \`<\`: [< abcABC123あいう]
 	[< る  び きほう][ルビ記法]
 \`>\`: [> abcABC123あいう]
 	[ユーザーフラッグ記法]
 \`~\`: [~ abcABC123あいう]
 	[曇りガラス記法]
 \`/\`: [/ abcABC123あいう]
 	[/ [イドバタニシ.icon]]
 	[アイコン記法を画像記法っぽくするUserCSS]
 \`-\`: [- abcABC123あいう]
 	[- [イドバタニシ.icon]]
 	[iconを回転する記法]
 \`!\`: [! abcABC123あいう]
 	[! [イドバタニシ.icon]]
 	[iconを振動させる記法]
 \`()\`: [() abcABC123あいう]
 	[() [blu3mo.icon]]
 		[イドバタニシ.icon]だとわかりにくいので[blu3mo.icon]氏のアイコンをお借りしました[Mijinko_SD.icon]
 	[iconを丸くする記法]
 \`,\`: [, abcABC123あいう]
  [行内で小さくするUserCSS]
未使用
 \`(\`: [( abcABC123あいう]
 \`)\`: [) abcABC123あいう]
 	単体で使われていないだけで、\`(\`と\`)\`を同時に使うと[iconを丸くする記法]になる[Mijinko_SD.icon]
 	今後単体で使う場合は、\`.deco-\):not(.deco-\() {}\`といった感じで両方使われた場合は無効化する工夫が必要になるかもしれない
 \`+\`: [+ abcABC123あいう]
 　[(提案)+のブラケット記法はサンドボックス的な用途のために残しておきたい]
\`[(使用されていない|空いている)(装飾|かっこ|ブラケット)記法の記号]\` [, [(使用されていない装飾記法の記号)​]] [, [(使用されていないかっこ記法の記号)​]] [, [(使用されていないブラケット記法の記号)​]] [, [(空いている装飾記法の記号)​]] [, [(空いているかっこ記法の記号)​]] [, [(空いているブラケット記法の記号)​]]
　（使用されていない記号を検索したらここに飛ぶ様にしたいという意図のリンクです↑）[blu3mo.icon]
		なるほど[Mijinko_SD.icon]
[文字装飾記法]の書き方
 \`[何か 適用文字]\`
  \` [* 太字]\`：[* 太字]
 記号を重ねると効果が重複する(順不同)
  [*-/_ 色々てんこもり]
  UserCSSで特殊コンボを設定している場合もある
   例：[-!***** [イドバタニシ.icon]]
 入れ子
  [[ [- マーカー記法が適用されない]よう]]
  [* [- 文字装飾記法内部のブラケットは、問答無用でリンクか埋め込み記法とみなさされる]。[https://i.gyazo.com/da78df293f9e83a74b5402411e2f2e01.png]]
  [- [$ \text{数式}]は入れ子にできる]
  [_ 空白記法は入れられない[  ]]
  [- #hashtag 、icon[イドバタニシ.icon]は入れられる]
  [* [タイトルつきリンク https://scrapbox.io/help-jp/ブラケティング]も認識可]
  [* 二重ブラケティングする記法は埋め込められない[[https://i.gyazo.com/da78df293f9e83a74b5402411e2f2e01.png]]]

[** 箇条書き]
 1
  2
   3
    4
     5
      6
       7
 1.
  2.
   3.
    4.
     5.
      6.
       7.
 [箇条書きのバレットをFontAwesomeにするUserCSS]

[** アイコン]
[イドバタニシ.icon] アイコン
[イドバタニシ.icon*1000]繰り返しアイコン (最大1000個)
[[イドバタニシ.icon]]大きなアイコン
 [* [イドバタニシ.icon]]
 [** [イドバタニシ.icon]]
 [*** [イドバタニシ.icon]]
 [**** [イドバタニシ.icon]]
 [***** [イドバタニシ.icon]]
 [****** [イドバタニシ.icon]]
 [******* [イドバタニシ.icon]]
 [******** [イドバタニシ.icon]]
 [********* [イドバタニシ.icon]]
 [********** [イドバタニシ.icon]]

[** 埋め込み]
画像
	単体画像
  [https://i.gyazo.com/da78df293f9e83a74b5402411e2f2e01.png]
 高さ制限をなくす
  [[https://i.gyazo.com/da78df293f9e83a74b5402411e2f2e01.png]]
　リンク付き画像
  [https://i.gyazo.com/da78df293f9e83a74b5402411e2f2e01.png https://google.com]
 Gyazo
  [https://gyazo.com/da78df293f9e83a74b5402411e2f2e01]
 リンク付きGyazo
  [https://gyazo.com/da78df293f9e83a74b5402411e2f2e01  https://google.com]
	5連続画像
  [https://i.gyazo.com/da78df293f9e83a74b5402411e2f2e01.png][https://i.gyazo.com/da78df293f9e83a74b5402411e2f2e01.png][https://i.gyazo.com/da78df293f9e83a74b5402411e2f2e01.png][https://i.gyazo.com/da78df293f9e83a74b5402411e2f2e01.png][https://i.gyazo.com/da78df293f9e83a74b5402411e2f2e01.png]
	[画像を並べて表示する記法]
		[*****| [https://i.gyazo.com/da78df293f9e83a74b5402411e2f2e01.png][https://i.gyazo.com/da78df293f9e83a74b5402411e2f2e01.png][https://i.gyazo.com/da78df293f9e83a74b5402411e2f2e01.png][https://i.gyazo.com/da78df293f9e83a74b5402411e2f2e01.png][https://i.gyazo.com/da78df293f9e83a74b5402411e2f2e01.png]]

[location記法]
 ピンなし
  [N35.6576943,E139.7452035,Z16]
 ピンあり
  [N35.6576943,E139.7452035,Z16 東京タワー]
 複数ピン
  [N35.6576943,E139.7452035,Z16 東京タワー|東京プリンスホテル|増上寺|宝珠院|セブン-イレブン+港区飯倉店|ABC-TOKYO+バレエ団|35.657291, 139.744780|ザ・プリンス+パークタワー東京|日本経緯度原点]

動画
	Youtube
		[https://www.youtube.com/watch?v=LSvaOcaUQ3Y]
 Youtube再生リスト
  [https://www.youtube.com/playlist?list=PLmoRDY8IgE2Okxy4WWdP95RHXOTGzJfQs]
 Youtube再生リスト(動画付き)
  [https://www.youtube.com/watch?v=57rdbK4vmKE&list=PLmoRDY8IgE2Okxy4WWdP95RHXOTGzJfQs]
 Youtube Music
  [https://music.youtube.com/watch?v=nj1cre2e6t0]
 Vimeo
  [https://vimeo.com/121284607]
 MP4
 	[https://video.twimg.com/ext_tw_video/1497455496688766981/pu/vid/898x626/8GfIKUHGs_FM4g_a.mp4]

音声
 音声
  [https://www.ne.jp/asahi/music/myuu/wave/menuettm.mp3]
 [タイトル付きオーディオ]
  [https://www.ne.jp/asahi/music/myuu/wave/menuettm.mp3 モーツァルト「メヌエット」]
 [Spotify]
  いつの間に対応してた
  [/sno2wman/Scrapboxでリンクを張るとiframeになるもの]
  [https://open.spotify.com/album/1bgUOjg3V0a7tvEfF1N6Kk]
 [anchor]
  [https://anchor.fm/notainc/episodes/1-FM-e1gh6a7/a-a7m2veg]

[/Mijinko/記法サンプル(Scrapbox)]
[/yuta0801/Scrapboxの全構文まとめ]
[文字装飾記法で遊ぶページ]

[UserCSS.icon]`),
    `記法サンプル
Settingsで設定したUserCSSの表示テスト用ページ


でかい文字
1
2
3
4
5
6
7
8
9
10

リンク
ハッシュタグ
リンク
###存在しないリンク###
ブラケティング （外部プロジェクトリンク）
 外部プロジェクトリンク(scrapbox.io)

外部リンクを区別するUserCSS
  外部サイトリンク
  Twitterのリンク
特定のリンクにアイコンをつけるUserCSS
  GitHubのリンク
  ウィキペディアのリンク
  PDFへのリンク
  Amazonのリンク

コードブロック
コードブロック.py
 print("Hello World!")
ファイル名なしコードブロック
py
 print("Hello World!")
インデントつき
 インデント.md
  - インデント
    - インデント
言語を強制
 python(js)
  console.log("I'm JavaScript");
文芸的プログラミング
 標準ヘッダファイルをインクルード
  main.cpp
   #include <iostream>

 main函数の定義
  main.cpp
   int main() {
     std::cout << "Hello, C++" << "from scrapbox.io" << std::endl;
   }


テーブル
表組み
 ■	列2
 行2	■
 リンク\t\tアイコン\t\t\t
 と 	て	も	な	が	い	て	ー	ぶ	る	の	て	す	と	The	test	for	very	long	table
文芸的CSV
 plot
  x	y
  0	1
  1	1
  2	2
  3	3
 フィボナッチだ！
 plot
  4	5
  5	8
  6	13
  7	21
  8	34
  9	55

数式
 \\(e^{i\\theta}=\\cos\\theta+i\\sin\\theta\\)
 文章の中に\\(\\text{数式}\\)を入れる
  \\(a_{n+1}=a_n+1\\)
  あれ？箇条書きの点消えるんじゃなかったっけ？
  数式行にも常にバレットを表示するUserCSSが利いてるっぽい
 Scrapboxの数式記法

文字装飾とか
通常
太字
 リンク入り太字
 [[リンクは書き込めるが、文字装飾は書き込めない]
取り消し線
下線
斜体(Italic)
 インラインコード
> 引用文
 >  インデントつき引用文
 >  中にはリンクや\\(\\text{数式}\\)も書けます
? Helpfeel
$ コマンド
% コマンド
[    ]: 空白記法

ブラケット記法
デフォルト
  [] :abcABC123あいう
  マーカー記法
  * : abcABC123あいう
  / : abcABC123あいう
  - : abcABC123あいう
  _ : abcABC123あいう
UserCSS
  " : abcABC123あいう
  インライン引用記法
  # : abcABC123あいう
  ネタバレ防止記法
   無効化された
  白黒記法

  % : abcABC123あいう
  スプレッドシート的に使う記法
  & : abcABC123あいう
  愚痴記法
  ' : abcABC123あいう
  中央揃え記法
  . : abcABC123あいう
  リンクを出典アイコンにするUserCSSSettings#6157ebcf1280f00000ad87f1
  { : abcABC123あいう
  } : abcABC123あいう
  ふきだし記法
  | : abcABC123あいう
  画像を並べて表示する記法
  123456
  < : abcABC123あいう
  る  び きほうルビ記法
  > : abcABC123あいう
  ユーザーフラッグ記法
  ~ : abcABC123あいう
  曇りガラス記法
  / : abcABC123あいう

  アイコン記法を画像記法っぽくするUserCSS
  - : abcABC123あいう

  iconを回転する記法
  ! : abcABC123あいう

  iconを振動させる記法
  () : abcABC123あいう

   だとわかりにくいので氏のアイコンをお借りしました
  iconを丸くする記法
  , : abcABC123あいう
  行内で小さくするUserCSS
未使用
  ( : abcABC123あいう
  ) : abcABC123あいう
  単体で使われていないだけで、 ( と ) を同時に使うとiconを丸くする記法になる
  今後単体で使う場合は、 .deco-):not(.deco-() {} といった感じで両方使われた場合は無効化する工夫が必要になるかもしれない
  + : abcABC123あいう
  (提案)+のブラケット記法はサンドボックス的な用途のために残しておきたい
 [(使用されていない|空いている)(装飾|かっこ|ブラケット)記法の記号]  (使用されていない装飾記法の記号)​ (使用されていないかっこ記法の記号)​ (使用されていないブラケット記法の記号)​ (空いている装飾記法の記号)​ (空いているかっこ記法の記号)​ (空いているブラケット記法の記号)​
 （使用されていない記号を検索したらここに飛ぶ様にしたいという意図のリンクです↑）
  なるほど
文字装飾記法の書き方
  [何か 適用文字]
    [* 太字] ：太字
 記号を重ねると効果が重複する(順不同)
  色々てんこもり
  UserCSSで特殊コンボを設定している場合もある
   例：
 入れ子
  [[ マーカー記法が適用されないよう]]
  - 文字装飾記法内部のブラケットは、問答無用でリンクか埋め込み記法とみなさされる。
  [- \\(	ext{数式}\\)は入れ子にできる]
  [_ 空白記法は入れられない[  ]]
  hashtag 、iconは入れられる
   タイトルつきリンク も認識可
  二重ブラケティングする記法は埋め込められない[]

箇条書き
 1
  2
   3
    4
     5
      6
       7
 1.
  2.
   3.
    4.
     5.
      6.
       7.
 箇条書きのバレットをFontAwesomeにするUserCSS

アイコン
 アイコン
繰り返しアイコン (最大1000個)
大きなアイコン











埋め込み
画像
 単体画像

 高さ制限をなくす

 リンク付き画像

 Gyazo

 リンク付きGyazo

 5連続画像

 画像を並べて表示する記法


location記法
 ピンなし

 ピンあり

 複数ピン


動画
 Youtube

 Youtube再生リスト

 Youtube再生リスト(動画付き)

 Youtube Music

 Vimeo

 MP4


音声
 音声

 タイトル付きオーディオ
   モーツァルト「メヌエット」
 Spotify
  いつの間に対応してた
  Scrapboxでリンクを張るとiframeになるもの

 anchor


記法サンプル(Scrapbox)
Scrapboxの全構文まとめ
文字装飾記法で遊ぶページ

`,
  );
});
