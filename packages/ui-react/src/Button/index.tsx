/**
 * React 示例按钮组件
 * 用于测试在 Astro 文档站点中引用 React 组件
 */
interface ButtonProps {
  text?: string
}

export const Button = ({ text = '点击我把' }: ButtonProps) => {
  return (
    <button
      style={{
        padding: '8px 16px',
        backgroundColor: '#61dafb',
        color: '#282c34',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
      }}
    >
      {text}
    </button>
  )
}

export default Button
