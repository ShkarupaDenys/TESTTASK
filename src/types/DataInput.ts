export interface DataInput {
  name: 'name' | 'email' | 'phone',
  placeholder: string,
  className: string,
  type?: string,
  helperText?: string,
}
