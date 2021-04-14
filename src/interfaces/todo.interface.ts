export interface Todo {
  id_todo: number // ID（プライマリーキー）
  content: string // 内容
  color_code: string // カラーコード
  checked: boolean // 完了済みフラグ
  dt_do: string // 実行日時（YYYY-MM-DD hh:mm:dd）
  dt_create: string // 作成日時（YYYY-MM-DD hh:mm:dd）
  dt_update: string // 更新日時（YYYY-MM-DD hh:mm:dd）
}
