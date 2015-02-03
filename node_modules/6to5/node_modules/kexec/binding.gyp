{
  'targets': [
    {
      'target_name': 'kexec',
      'sources': [ 'src/kexec.cc' ],
      'defines': ['<!@(node -v |grep "v0.11" > /dev/null && echo "__NODE_V0_11__" || echo "__NOT_NODE_V0_11__")']
    }
  ]
}
